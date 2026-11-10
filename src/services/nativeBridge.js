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

export const NativeBridge = {
  isNative: Capacitor.isNativePlatform(),
  admobInitialized: false,
  purchasesInitialized: false,
  rewardedPrepared: false,
  interstitialPrepared: false,
  bannerVisible: false,
  activeRewardCallback: null,
  productsMap: {},

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
        this.prepareInterstitialAd(); // Pre-load next interstitial
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

  // Interstitial: Pre-caches next interstitial for instant playback on every 4th win
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

  async showInterstitial() {
    if (!this.isNative) {
      console.log('[Ads] Interstitial requested (web mode — simulated).');
      return false;
    }
    try {
      if (!this.interstitialPrepared) {
        console.log('AdMob: Interstitial not yet prepared, preparing now...');
        await this.prepareInterstitialAd();
      }
      if (!this.interstitialPrepared) {
        console.warn('AdMob: Interstitial could not be prepared.');
        return false;
      }
      await AdMob.showInterstitial();
      this.interstitialPrepared = false;
      return true;
    } catch (err) {
      console.warn('Native AdMob interstitial error:', err);
      return false;
    }
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

  async loadProducts(productIds) {
    if (!this.isNative || !this.purchasesInitialized) return {};
    try {
      const ids = productIds || (CONFIG && CONFIG.products ? CONFIG.products.map(p => p.id) : [
        'bundle_starter', 'bundle_weapon_x', 'bundle_inferno', 'bundle_dragon', 'bundle_steel', 'bundle_cosmic',
        'gem_pouch', 'gem_sack', 'gem_chest', 'gem_vault', 'gem_treasury', 'gem_mountain',
        'feature_offline', 'feature_vip', 'feature_remove_ads', 'feature_frenzy_boost'
      ]);

      // 1. Fetch In-App Products (NON_SUBSCRIPTION is required for Android Google Play one-time purchases)
      try {
        const { products } = await Purchases.getProducts({
          productIdentifiers: ids,
          type: PRODUCT_CATEGORY.NON_SUBSCRIPTION
        });
        if (products && products.length > 0) {
          for (const p of products) {
            this.productsMap[p.identifier] = p;
          }
          console.log(`[RevenueCat] Preloaded ${products.length} non-subscription products from Google Play:`, products.map(p => p.identifier));
        }
      } catch (errNonSub) {
        console.warn('[RevenueCat] getProducts(NON_SUBSCRIPTION) error:', errNonSub);
      }

      // 2. Fetch Offerings as fallback / supplement
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings && offerings.current && offerings.current.availablePackages) {
          for (const pkg of offerings.current.availablePackages) {
            if (pkg.product) {
              this.productsMap[pkg.product.identifier] = pkg.product;
              this.productsMap[pkg.identifier] = pkg.product;
            }
          }
          console.log(`[RevenueCat] Offerings loaded. Total products mapped: ${Object.keys(this.productsMap).length}`);
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
      // Normalize productId (e.g. handle duplicate prefixes like gem_gem_pouch -> gem_pouch)
      const cleanId = productIdentifier.replace(/^gem_gem_/, 'gem_')
                                       .replace(/^bundle_bundle_/, 'bundle_')
                                       .replace(/^feature_feature_/, 'feature_');

      let product = this.productsMap[cleanId] || this.productsMap[productIdentifier];

      // If not yet cached, attempt to fetch directly with NON_SUBSCRIPTION type
      if (!product) {
        console.log(`[RevenueCat] Product ${cleanId} not cached, fetching from Google Play...`);
        try {
          const { products } = await Purchases.getProducts({
            productIdentifiers: [cleanId, productIdentifier],
            type: PRODUCT_CATEGORY.NON_SUBSCRIPTION
          });
          if (products && products.length > 0) {
            product = products.find(p => p.identifier === cleanId || p.identifier === productIdentifier) || products[0];
            this.productsMap[cleanId] = product;
            this.productsMap[productIdentifier] = product;
          }
        } catch (fetchErr) {
          console.warn(`[RevenueCat] Failed fetching product ${cleanId}:`, fetchErr);
        }
      }

      // Check offerings fallback if product still not directly found
      if (!product) {
        try {
          const offerings = await Purchases.getOfferings();
          if (offerings && offerings.current && offerings.current.availablePackages) {
            const pkg = offerings.current.availablePackages.find(p =>
              p.product?.identifier === cleanId || p.product?.identifier === productIdentifier || p.identifier === cleanId
            );
            if (pkg) {
              console.log(`[RevenueCat] Purchasing via Offerings package: ${pkg.identifier}`);
              const purchaseResult = await Purchases.purchasePackage({ aPackage: pkg });
              return {
                success: true,
                customerInfo: purchaseResult.customerInfo,
                transaction: purchaseResult.transaction,
                productIdentifier: cleanId
              };
            }
          }
        } catch (offErr) {
          console.warn('[RevenueCat] Offerings purchase fallback check failed:', offErr);
        }
      }

      if (!product) {
        console.error(`[RevenueCat] Product (${cleanId}) could not be resolved from Google Play.`);
        return { success: false, error: new Error('Product (' + cleanId + ') not found in Google Play') };
      }

      console.log(`[RevenueCat] Launching purchaseStoreProduct for: ${product.identifier}`);
      const purchaseResult = await Purchases.purchaseStoreProduct({ product });
      return {
        success: true,
        customerInfo: purchaseResult.customerInfo,
        transaction: purchaseResult.transaction,
        productIdentifier: purchaseResult.productIdentifier || product.identifier || cleanId
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
