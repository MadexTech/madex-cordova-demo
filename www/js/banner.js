document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const adType = window.Madex.BANNER;
    const placementName = EnvironmentVariables.coreBannerUnitID;
    const advert = document.querySelector("#advert");

    advert.setAttribute("placementname", placementName);
    advert.setAttribute("adtype", adType);

    if (window.Madex) {
      const showCloseButton = true;
      window.Madex.setBannerCustomSettings(showCloseButton);
    }

    window.addEventListener("onBannerLoaded", function (adInfo) {
      _addLog("onBannerLoaded");
    });
    window.addEventListener("onBannerLoadFailed", function (adInfo) {
      _addLog(`onBannerLoadFailed - ${adInfo.error}`);
    });
    window.addEventListener("onBannerShown", function (adInfo) {
      _addLog("onBannerShown");
    });
    window.addEventListener("onBannerShowFailed", function (adInfo) {
      _addLog(`onBannerShowFailed - ${adInfo.error}`);
    });
    window.addEventListener("onBannerClosed", function (adInfo) {
      _addLog("onBannerClosed");
    });
    window.addEventListener("onBannerImpression", function (adInfo) {
      _addLog("onBannerImpression");
    });
  } catch (error) {
    console.error(error);
  }
}

function _addLog(message) {
  const advert = document.querySelector("#advert");
  const logger = advert.shadowRoot.querySelector("#logger");

  const currentText = logger.textContent || "";
  const separator = currentText.length > 0 ? "\n" : "";
  logger.textContent = currentText + separator + "* " + message;
}
