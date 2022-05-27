/**#####################################
  * Sets up server-side HTML environment     steve terry
  * Routes requests for pages to appropiate
  * html page.
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

  if (e.parameter.pageName == "mDisk") {
    Logger.log("    in mDisk calc")
    return HtmlService.createHtmlOutputFromFile('mDisk').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }  
  else if (e.parameter.pageName == "Slab") {
        Logger.log("    in Cuboid calc")
   return HtmlService.createHtmlOutputFromFile('Slab').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } 
  else if (e.parameter.pageName == "Custom") {
        Logger.log("    in Custom")
   return HtmlService.createHtmlOutputFromFile('Custom').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } 
  else {
    // No page defined so throw and error page
      Logger.log("    No page defined - Big old ERROR")
    return HtmlService.createHtmlOutput("No page defined - Big old ERROR"); 
  }
  // return HtmlService.createHtmlOutputFromFile('Cuboid').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  //.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};

/**
 * this method takes json and turns it into
 * an html table of the MG recipe to be displayed to the user
 * json should have the 4 fields of glass,water,binder and liquid medium.
 */
function createBaseVolume(volumeObject) {
  console.log("createBaseVolume: object passed to createRecipe " + JSON.stringify(volumeObject));
  // The total volume multiplied by 2 (the sg of MG) will give you the weight
  //  of the MG needed to fill the volume.
  // Now multiply the total weight by the ratio for each ingredient.
  // That we give you the weight amount for each ingredient.
  volumeObject.total_weight = volumeObject.volume * 2;
  volumeObject.glass = (volumeObject.total_weight * GLASS).toFixed(1); // grams of glass powder to use
  volumeObject.water = (volumeObject.total_weight * WATER).toFixed(1);
  volumeObject.binder = (volumeObject.total_weight * BINDER).toFixed(1);
  volumeObject.liquid_medium = (volumeObject.total_weight * LMEDIUM).toFixed(1);
  
  return volumeObject;

};

