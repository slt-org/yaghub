/**#####################################
  * Sets up server-side HTML environment
  */
function doGet(e) {
   Logger.log("Entered web app");
  if(e.parameter != null || e.parameter != undefined ){
     Logger.log("parameters supplied "+e.parameter);
  }
  var params = JSON.stringify(e);
  Logger.log("Parameters : \n"+params);

  // Route the request to a function call for each MG-calc
  // There must be a pageName parameter or we Error out.

  if (e.parameter.pageName == "Disk") {
    Logger.log("    in Disk calc")
    return HtmlService.createHtmlOutputFromFile('Disk').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }  
  else if (e.parameter.pageName == "Cuboid") {
        Logger.log("    in Cuboid calc")
   return HtmlService.createHtmlOutputFromFile('Cuboid').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } 
  else if (e.parameter.pageName == "AnyVolume") {
        Logger.log("    in Any calc")
   return HtmlService.createHtmlOutputFromFile('AnyVolume').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } 
  else {
    // No page defined so throw and error page
      Logger.log("    No page defined - Big old ERROR")
    return HtmlService.createHtmlOutput("No page defined - Big old ERROR"); 
  }
  // return HtmlService.createHtmlOutputFromFile('Cuboid').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  //.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};

