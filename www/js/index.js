document.addEventListener('deviceready', onDeviceReady, false);

var Madex;

const AdType = {
    interstitial: 1,
    rewarded: 3,
};

function onDeviceReady() {
    Madex = cordova.require('cordova.plugin.madex.MadexPlugin');
    _init();
}

function _init() {
    Madex.enableDebug(true);
    Madex.initialize(EnvVariables.publisherID);
    Madex.setUserConsent(true);

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('load_interstitial').addEventListener("click", _loadInterstitial);
    document.getElementById('show_interstitial').addEventListener("click", _showInterstitial);
    document.getElementById('destroy_interstitial').addEventListener("click", _destroyInterstitial);
    document.getElementById('load_rewarded').addEventListener("click", _loadRewarded);
    document.getElementById('show_rewarded').addEventListener("click", _showRewarded);
    document.getElementById('destroy_rewarded').addEventListener("click", _destroyRewarded);

    _initializeInterstitialListener();
    _initializeRewardedListener();

}

function _initializeInterstitialListener() {
    window.addEventListener('onInterstitialLoaded', function (adInfo) {
        _logEvent('onInterstitialLoaded');
    });
    window.addEventListener('onInterstitialLoadFailed', function (adInfo) {
        _logEvent(`onInterstitialLoadFailed - ${adInfo.error}`);
    });
    window.addEventListener('onInterstitialShown', function (adInfo) {
        _logEvent('onInterstitialShown');
    });
    window.addEventListener('onInterstitialShowFailed', function (adInfo) {
        _logEvent(`onInterstitialShowFailed - ${adInfo.error}`);
    });
    window.addEventListener('onInterstitialClosed', function (adInfo) {
        _logEvent('onInterstitialClosed');
    });
}


function _initializeRewardedListener() {
    window.addEventListener('onRewardedLoaded', function (adInfo) {
        _logEvent('onRewardedLoaded');
    });
    window.addEventListener('onRewardedLoadFailed', function (adInfo) {
        _logEvent(`onRewardedLoadFailed - ${adInfo.error}`);
    });
    window.addEventListener('onRewardedShown', function (adInfo) {
        _logEvent('onRewardedShown');
    });
    window.addEventListener('onRewardedShowFailed', function (adInfo) {
        _logEvent(`onRewardedShowFailed - ${adInfo.error}`);
    });
    window.addEventListener('onRewardedClosed', function (adInfo) {
        _logEvent('onRewardedClosed');
    });
    window.addEventListener('onRewardedFinished', function (adInfo) {
        _logEvent('onRewardedFinished');
    });
}

function _loadInterstitial() {
    Madex.loadAd(AdType.interstitial, EnvVariables.madexInterstitialUnitID);
}

function _showInterstitial() {
    Madex.showAd(AdType.interstitial, EnvVariables.madexInterstitialUnitID);
}

function _destroyInterstitial() {
    Madex.destroyAd(AdType.interstitial, EnvVariables.madexInterstitialUnitID);
}

function _loadRewarded() {
    Madex.loadAd(AdType.rewarded, EnvVariables.madexRewardedUnitID);
}

function _showRewarded() {
    Madex.showAd(AdType.rewarded, EnvVariables.madexRewardedUnitID);
}

function _destroyRewarded() {
    Madex.destroyAd(AdType.rewarded, EnvVariables.madexRewardedUnitID);
}

function _logEvent(message) {
    var logger = document.getElementById('logger');
    logger.textContent = `${logger.innerHTML}\n ${message}`;
}