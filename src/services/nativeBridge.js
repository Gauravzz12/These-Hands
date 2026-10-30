import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { AdMob, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Purchases } from '@revenuecat/purchases-capacitor';

// Google AdMob Rewarded Ad Unit ID
const REWARDED_AD_UNIT_ID = 'ca-app-pub-4838625298188198/2176399244';
// Official Google AdMob Test Rewarded Ad Unit ID (ensures ad playback during testing / account verification)
const TEST_REWARDED_AD_UNIT_ID = 'ca-app-pub-3940256099942544/5224354917';

export const NativeBridge = {
  isNative: Capacitor.isNativePlatform(),
  admobInitialized: false,
  purchasesInitialized: false,
  rewardedPrepared: false,
  activeRewardCallback: null,

  async init() {
    if (!this.isNative) {
      console.log('Running in Web/Browser Mode - Native bridge using web simulations.');
      return;
    }

    try {
      // 1. Status Bar & Splash Screen
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#1a0f08' });
      await SplashScreen.hide();

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

      // 3. Initialize AdMob
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['EMULATOR'],
        initializeForTesting: true,
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
        this.prepareRewardedAd(); // Pre-load next ad
      });

      AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (err) => {
        console.warn('AdMob failed to load:', err);
        this.rewardedPrepared = false;
      });

      await this.prepareRewardedAd();
      console.log('Native AdMob & Back Button bridge initialized successfully.');
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
      console.warn('AdMob: Live unit not filled (account pending verification or emulator test), falling back to test unit:', e);
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
        console.log('AdMob: Ad not yet prepared, attempting prepare now...');
        await this.prepareRewardedAd();
      }
      if (!this.rewardedPrepared) {
        console.warn('AdMob: Ad could not be prepared.');
        return false;
      }
      await AdMob.showRewardVideoAd();
      return true;
    } catch (err) {
      console.warn('Native AdMob show error:', err);
      return false;
    }
  },

  // RevenueCat / Google Play Billing
  async initPurchases(revenueCatApiKey) {
    if (!this.isNative || !revenueCatApiKey) return;
    try {
      await Purchases.configure({ apiKey: revenueCatApiKey });
      this.purchasesInitialized = true;
      console.log('Google Play Purchases bridge initialized via RevenueCat.');
    } catch (e) {
      console.warn('Failed to initialize Google Play Purchases:', e);
    }
  },

  async purchaseGooglePlayProduct(productIdentifier) {
    if (!this.isNative || !this.purchasesInitialized) {
      return { success: false, reason: 'not_native' };
    }
    try {
      const { customerInfo } = await Purchases.purchaseProduct({ productIdentifier });
      return { success: true, customerInfo };
    } catch (err) {
      if (err.userCancelled) {
        return { success: false, cancelled: true };
      }
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
  }
};

