import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { AdMob, RewardAdPluginEvents, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { Purchases, PRODUCT_CATEGORY, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { CONFIG } from '../game/config.js';

// Google AdMob Rewarded Ad Unit ID
const REWARDED_AD_UNIT_ID = 'ca-app-pub-4838625298188198/2176399244';
// Official Google AdMob Test Rewarded Ad Unit ID (fallback if live unit unverified)
const TEST_REWARDED_AD_UNIT_ID = 'ca-app-pub-3940256099942544/5224354917';

// Google AdMob Interstitial + Banner Ad Unit IDs
// Live unit IDs from AdMob console (can be configured here):
const INTERSTITIAL_AD_UNIT_ID = '';
const TEST_INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-3940256099942544/1033173712';
const BANNER_AD_UNIT_ID = '';
const TEST_BANNER_AD_UNIT_ID = 'ca-app-pub-3940256099942544/6300978111';

// RevenueCat Public API Key (Google Play)
// Configurable via VITE_REVENUECAT_KEY or window.__REVENUECAT_KEY__
export const REVENUECAT_GOOGLE_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_REVENUECAT_KEY) ||
  (typeof window !== 'undefined' && window.__REVENUECAT_KEY__) ||
  'goog_XVNXRkjWHUFevwPwrsXdRaCjVwj';

export function getCandidateIds(id) {
  if (!id) return [];
  const clean = String(id)
    .replace(/^gem_gem_/, 'gem_')
    .replace(/^bundle_bundle_/, 'bundle_')
    .replace(/^feature_feature_/, 'feature_');
  const set = new Set([id, clean]);

  const stripped = clean.replace(/^(gem|bundle|feature)_/, '');
  set.add(stripped);
  set.add(`gem_${stripped}`);
  set.add(`bundle_${stripped}`);
  set.add(`feature_${stripped}`);
  set.add(`com.idleslapper.game.${clean}`);
  set.add(`com.idleslapper.game.${stripped}`);

  return Array.from(set);
}

export const NativeBridge = {
  isNative: Capacitor.isNativePlatform(),
  admobInitialized: false,
  purchasesInitialized: false,
  rewardedPrepared: false,
  interstitialPrepared: false,
  bannerVisible: false,
  activeRewardCallback: null,
  activeInterstitialCallback: null,
  activeInterstitialShowing: false,
  productsMap: {},
  packagesMap: {},

  async init() {
    if (!this.isNative) {
      console.log('Running in Web/Browser Mode - Native bridge using web simulations.');
      return;
    }

    try {
      // 1. Status Bar & Splash Screen (True Fullscreen)
      try {
        await StatusBar.hide();
      } catch (e) {
        await StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      }
      await SplashScreen.hide();

      // App state change (Mute audio on minimize / background)
      App.addListener('appStateChange', ({ isActive }) => {
        if (!isActive) {
          if (typeof window.__handleAppHide === 'function') window.__handleAppHide();
        } else {
          if (typeof window.__handleAppShow === 'function') window.__handleAppShow();
          StatusBar.hide().catch(() => {});
        }
      });

      // 2. Hardware Back Button Handling
      App.addListener('backButton', () => {
        // Close modals if open
        const mockModal = document.getElementById('mockCheckout');
        const adModal = document.getElementById('adModal');
        const moreSheet = document.getElementById('moreSheetOverlay');

        if (mockModal && mockModal.classList.contains('open')) {
          mockModal.classList.remove('open');
          return;
        }
        if (adModal && adModal.style.display !== 'none') {
          return; // Don't interrupt rewarded ad
        }
        if (moreSheet && moreSheet.style.display !== 'none') {
          moreSheet.style.display = 'none';
          return;
        }

        // Navigate back to Home if on another tab
        const activePage = document.querySelector('.page.active');
        if (activePage && activePage.id !== 'pageHome' && window.__th?.switchTab) {
          window.__th.switchTab('home');
          return;
        }

        // Exit app
        App.exitApp();
      });

      // 3. Initialize AdMob (Production Mode - test mode disabled)
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        initializeForTesting: false,
      });
      this.admobInitialized = true;

      // Setup Rewarded Ad listeners
      AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
        console.log('Native AdMob Reward granted:', reward);
        if (this.activeRewardCallback) {
          this.activeRewardCallback(true);
          this.activeRewardCallback = null;
        }
      });

      AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        this.rewardedPrepared = false;
        this.prepareRewardedAd(); // Pre-load next rewarded ad
      });

      AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (err) => {
        console.warn('AdMob rewarded failed to load:', err);
        this.rewardedPrepared = false;
      });

      // Setup Interstitial Ad listeners
      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        this.interstitialPrepared = false;
        this.activeInterstitialShowing = false;
        if (this.activeInterstitialCallback) {
          const cb = this.activeInterstitialCallback;
          this.activeInterstitialCallback = null;
          cb(true);
        }
        this.prepareInterstitialAd(); // Pre-load next interstitial
      });

      AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (err) => {
        console.warn('AdMob interstitial failed to show:', err);
        this.interstitialPrepared = false;
        this.activeInterstitialShowing = false;
        if (this.activeInterstitialCallback) {
          const cb = this.activeInterstitialCallback;
          this.activeInterstitialCallback = null;
          cb(false);
        }
        this.prepareInterstitialAd();
      });

      AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (err) => {
        console.warn('AdMob interstitial failed to load:', err);
        this.interstitialPrepared = false;
      });

      // Pre-load ads in background
      await Promise.all([
        this.prepareRewardedAd().catch(() => {}),
        this.prepareInterstitialAd().catch(() => {})
      ]);
      console.log('Native AdMob initialized in Production Mode.');

      // 4. Initialize RevenueCat (Google Play Billing)
      await this.initPurchases(REVENUECAT_GOOGLE_API_KEY).catch((e) => {
        console.warn('RevenueCat init error:', e);
      });
    } catch (err) {
      console.warn('NativeBridge initialization error:', err);
    }
  },

  async prepareRewardedAd() {
    if (!this.isNative || !this.admobInitialized) return;
    try {
      console.log('AdMob: Requesting rewarded ad with live unit ID:', REWARDED_AD_UNIT_ID);
      await AdMob.prepareRewardVideoAd({
        adId: REWARDED_AD_UNIT_ID,
      });
      this.rewardedPrepared = true;
      console.log('AdMob: Live rewarded ad prepared successfully.');
    } catch (e) {
      console.warn('AdMob: Live rewarded unit not filled, falling back to test unit:', e);
      try {
        await AdMob.prepareRewardVideoAd({
          adId: TEST_REWARDED_AD_UNIT_ID,
        });
        this.rewardedPrepared = true;
        console.log('AdMob: Test rewarded ad prepared successfully.');
      } catch (err2) {
        console.error('AdMob: Failed to load both live and test ad units:', err2);
        this.rewardedPrepared = false;
      }
    }
  },

  async showRewardedAd(onComplete, _placement = 'default') {
    if (!this.isNative) {
      // Fallback to web modal simulator
      return false; // Handled by web fallback
    }

    try {
      this.activeRewardCallback = onComplete;
      if (!this.rewardedPrepared) {
        console.log('AdMob: Rewarded ad not yet prepared, attempting prepare now...');
        await this.prepareRewardedAd();
      }
      if (!this.rewardedPrepared) {
        console.warn('AdMob: Rewarded ad could not be prepared.');
        return false;
      }
      await AdMob.showRewardVideoAd();
      return true;
    } catch (err) {
      console.warn('Native AdMob show error:', err);
      return false;
    }
  },

  // Interstitial: Pre-caches next interstitial for instant playback on every 3rd fight
  async prepareInterstitialAd() {
    if (!this.isNative || !this.admobInitialized) return;
    try {
      const adId = INTERSTITIAL_AD_UNIT_ID || TEST_INTERSTITIAL_AD_UNIT_ID;
      await AdMob.prepareInterstitial({ adId });
      this.interstitialPrepared = true;
      console.log('AdMob: Interstitial ad prepared successfully.');
    } catch (err) {
      console.warn('AdMob: Failed to prepare interstitial ad:', err);
      this.interstitialPrepared = false;
    }
  },

  async showInterstitial(onClose) {
    if (!this.isNative) {
      console.log('[Ads] Interstitial requested (web mode — simulated).');
      if (onClose) onClose(false);
      return false;
    }
    try {
      this.activeInterstitialCallback = onClose;
      if (!this.interstitialPrepared) {
        console.log('AdMob: Interstitial not yet prepared, preparing now...');
        await this.prepareInterstitialAd();
      }
      if (!this.interstitialPrepared) {
        console.warn('AdMob: Interstitial could not be prepared.');
        this.activeInterstitialCallback = null;
        if (onClose) onClose(false);
        return false;
      }
      this.activeInterstitialShowing = true;
      await AdMob.showInterstitial();
      this.interstitialPrepared = false;
      return true;
    } catch (err) {
      console.warn('Native AdMob interstitial error:', err);
      this.activeInterstitialShowing = false;
      this.activeInterstitialCallback = null;
      if (onClose) onClose(false);
      return false;
    }
  },

  isInterstitialShowing() {
    return !!this.activeInterstitialShowing;
  },

  // Banner: shown on Home, Stages, and Shop screens
  async showBanner() {
    if (!this.isNative) return false;
    if (this.bannerVisible) return true;
    try {
      const adId = BANNER_AD_UNIT_ID || TEST_BANNER_AD_UNIT_ID;
      await AdMob.showBanner({ adId, adSize: 'ADAPTIVE_BANNER', position: 'BOTTOM_CENTER', margin: 60 });
      this.bannerVisible = true;
      return true;
    } catch (err) {
      console.warn('Native AdMob banner error:', err);
      return false;
    }
  },

  async hideBanner() {
    if (!this.isNative) return false;
    if (!this.bannerVisible) return true;
    try {
      await AdMob.hideBanner();
      this.bannerVisible = false;
      return true;
    } catch (err) {
      return false;
    }
  },

  // RevenueCat / Google Play Billing
  async initPurchases(revenueCatApiKey) {
    if (!this.isNative || !revenueCatApiKey) {
      if (!this.isNative) {
        console.log('[RevenueCat] Browser mode: native Google Play Billing disabled.');
      }
      return;
    }
    try {
      try {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      } catch (logErr) {
        console.warn('[RevenueCat] Could not set log level:', logErr);
      }
      await Purchases.configure({ apiKey: revenueCatApiKey });
      this.purchasesInitialized = true;
      console.log('[RevenueCat] Google Play Purchases bridge initialized via RevenueCat with DEBUG logging.');
      await this.loadProducts();
    } catch (e) {
      console.warn('[RevenueCat] Failed to initialize Google Play Purchases:', e);
    }
  },

  mapProductAliases(product, pkg = null) {
    if (!product || !product.identifier) return;
    const candidates = getCandidateIds(product.identifier);
    for (const cand of candidates) {
      this.productsMap[cand] = product;
      if (pkg) this.packagesMap[cand] = pkg;
    }
    if (pkg && pkg.identifier) {
      this.packagesMap[pkg.identifier] = pkg;
      for (const cand of getCandidateIds(pkg.identifier)) {
        this.packagesMap[cand] = pkg;
      }
    }
  },

  async loadProducts(productIds) {
    if (!this.isNative || !this.purchasesInitialized) return {};
    try {
      const baseIds = productIds || (CONFIG && CONFIG.products ? CONFIG.products.map(p => p.id) : [
        'bundle_starter', 'bundle_weapon_x', 'bundle_inferno', 'bundle_dragon', 'bundle_steel', 'bundle_cosmic',
        'gem_pouch', 'gem_sack', 'gem_chest', 'gem_vault', 'gem_treasury', 'gem_mountain',
        'feature_offline', 'feature_vip', 'feature_remove_ads', 'feature_frenzy_boost'
      ]);

      const allCandidatesSet = new Set();
      for (const id of baseIds) {
        for (const cand of getCandidateIds(id)) {
          allCandidatesSet.add(cand);
        }
      }
      const candidateList = Array.from(allCandidatesSet);

      // 1. Fetch In-App Products (NON_SUBSCRIPTION is required for Android Google Play one-time purchases)
      try {
        const { products } = await Purchases.getProducts({
          productIdentifiers: candidateList,
          type: PRODUCT_CATEGORY.NON_SUBSCRIPTION
        });
        if (products && products.length > 0) {
          for (const p of products) {
            this.mapProductAliases(p);
          }
          console.log(`[RevenueCat] Preloaded ${products.length} non-subscription products:`, products.map(p => p.identifier));
        }
      } catch (errNonSub) {
        console.warn('[RevenueCat] getProducts(NON_SUBSCRIPTION) error:', errNonSub);
      }

      // 2. Fallback: Also try without type filter if 0 products found
      if (Object.keys(this.productsMap).length === 0) {
        try {
          const { products: anyProducts } = await Purchases.getProducts({
            productIdentifiers: candidateList
          });
          if (anyProducts && anyProducts.length > 0) {
            for (const p of anyProducts) {
              this.mapProductAliases(p);
            }
            console.log(`[RevenueCat] Preloaded ${anyProducts.length} default products:`, anyProducts.map(p => p.identifier));
          }
        } catch (errAny) {
          console.warn('[RevenueCat] getProducts() fallback error:', errAny);
        }
      }

      // 3. Fetch Offerings (checks all offerings, not just current)
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings) {
          const offeringList = [
            ...(offerings.current ? [offerings.current] : []),
            ...(offerings.all ? Object.values(offerings.all) : [])
          ];
          for (const off of offeringList) {
            if (off && off.availablePackages) {
              for (const pkg of off.availablePackages) {
                if (pkg.product) {
                  this.mapProductAliases(pkg.product, pkg);
                }
              }
            }
          }
          console.log(`[RevenueCat] Offerings processed. Total products mapped: ${Object.keys(this.productsMap).length}`);
        }
      } catch (offErr) {
        console.warn('[RevenueCat] getOfferings fallback error:', offErr);
      }

      if (typeof window !== 'undefined' && window.__th && typeof window.__th.renderShop === 'function') {
        window.__th.renderShop();
      }

      return this.productsMap;
    } catch (err) {
      console.warn('[RevenueCat] Failed to load store products:', err);
      return {};
    }
  },

  async purchaseGooglePlayProduct(productIdentifier) {
    if (!this.isNative || !this.purchasesInitialized) {
      return { success: false, reason: 'not_native' };
    }
    try {
      const candidates = getCandidateIds(productIdentifier);
      let product = null;
      let packageMatch = null;

      for (const c of candidates) {
        if (this.productsMap[c]) { product = this.productsMap[c]; break; }
        if (this.packagesMap[c]) { packageMatch = this.packagesMap[c]; break; }
      }

      // If not yet cached, fetch candidate list from Google Play
      if (!product && !packageMatch) {
        console.log(`[RevenueCat] Querying Google Play for candidates:`, candidates);
        try {
          const { products } = await Purchases.getProducts({
            productIdentifiers: candidates,
            type: PRODUCT_CATEGORY.NON_SUBSCRIPTION
          });
          if (products && products.length > 0) {
            for (const p of products) {
              this.mapProductAliases(p);
            }
            product = products[0];
          }
        } catch (fetchErr) {
          console.warn(`[RevenueCat] Failed fetching product candidates (NON_SUB):`, fetchErr);
        }
      }

      // Fallback fetch without type filter if still not found
      if (!product && !packageMatch) {
        try {
          const { products: anyProducts } = await Purchases.getProducts({
            productIdentifiers: candidates
          });
          if (anyProducts && anyProducts.length > 0) {
            for (const p of anyProducts) {
              this.mapProductAliases(p);
            }
            product = anyProducts[0];
          }
        } catch (fetchErrAny) {
          console.warn(`[RevenueCat] Failed fetching product candidates (fallback):`, fetchErrAny);
        }
      }

      // If still not found, check offerings directly
      if (!product && !packageMatch) {
        try {
          const offerings = await Purchases.getOfferings();
          if (offerings) {
            const allOffs = [
              ...(offerings.current ? [offerings.current] : []),
              ...(offerings.all ? Object.values(offerings.all) : [])
            ];
            for (const off of allOffs) {
              if (off && off.availablePackages) {
                for (const pkg of off.availablePackages) {
                  if (candidates.some(c => c === pkg.identifier || c === pkg.product?.identifier)) {
                    packageMatch = pkg;
                    break;
                  }
                }
              }
              if (packageMatch) break;
            }
          }
        } catch (offErr) {
          console.warn('[RevenueCat] Offerings lookup error:', offErr);
        }
      }

      // If we have an Offerings package, purchase via purchasePackage
      if (packageMatch) {
        console.log(`[RevenueCat] Purchasing via Offerings package: ${packageMatch.identifier}`);
        const purchaseResult = await Purchases.purchasePackage({ aPackage: packageMatch });
        return {
          success: true,
          customerInfo: purchaseResult.customerInfo,
          transaction: purchaseResult.transaction,
          productIdentifier: packageMatch.product?.identifier || productIdentifier
        };
      }

      // If we have a StoreProduct, purchase via purchaseStoreProduct
      if (product) {
        console.log(`[RevenueCat] Launching purchaseStoreProduct for: ${product.identifier}`);
        const purchaseResult = await Purchases.purchaseStoreProduct({ product });
        return {
          success: true,
          customerInfo: purchaseResult.customerInfo,
          transaction: purchaseResult.transaction,
          productIdentifier: purchaseResult.productIdentifier || product.identifier || productIdentifier
        };
      }

      // If neither was found from Google Play Billing:
      console.error(`[RevenueCat] None of product candidates (${candidates.join(', ')}) resolved from Google Play.`);
      return {
        success: false,
        error: new Error(`Product (${productIdentifier}) not found in Google Play. (Checked aliases: ${candidates.join(', ')})`)
      };
    } catch (err) {
      if (err.userCancelled || err.code === 1 || (err.message && err.message.toLowerCase().includes('cancel'))) {
        return { success: false, cancelled: true };
      }
      console.error('[RevenueCat] Purchase execution error:', err);
      return { success: false, error: err };
    }
  },

  async restorePurchases() {
    if (!this.isNative || !this.purchasesInitialized) {
      return { success: false, reason: 'not_native' };
    }
    try {
      const { customerInfo } = await Purchases.restorePurchases();
      return { success: true, customerInfo };
    } catch (err) {
      return { success: false, error: err };
    }
  },

  async getCustomerInfo() {
    if (!this.isNative || !this.purchasesInitialized) return null;
    try {
      const { customerInfo } = await Purchases.getCustomerInfo();
      return customerInfo;
    } catch (err) {
      console.warn('[RevenueCat] getCustomerInfo error:', err);
      return null;
    }
  }
};
