document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const publisherID = EnvironmentVariables.publisherID;

    window.Madex = cordova.require("cordova.plugin.madex.Madex");

    Madex.enableDebug(true);
    window.Madex.initialize(publisherID, function (error) {
      if (error) {
        console.error("Plugin initialization error:", error);
      } else {
        const version = window.Madex.version;
        console.log(`Plugin successfully initialized (${version})`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
