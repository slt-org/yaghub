
/**#####################################
  * Gets a json values from server-side input. 
  * Sends it to updateNumber to be updated.
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function iGetDiskRecipeFromWebAPP(element) {
  console.log("in idisk.gs: iGetDiskRecipeFromWebAPP:*******************");
  console.log(element);
  var inputUnits = "imperial";
  //Just a quick proof that the returned number value will be a text. Remove on production.
  console.log(`Returned json is: ${element}`, typeof element);

  /**
   * This all belongs under validation
   */
  if (element == null) {
    return `<em style='color:red'> You didn't input a number!`;
  }

  // Turn json text into json object
  var parsed_obj = JSON.parse(element);
  console.log("json object parsed from serverside: radius=" + parsed_obj.radius + " height="
    + parsed_obj.height + " inputUnits=" + parsed_obj.inputUnits + " outputUnits=" + parsed_obj.outputUnits);

  // turn fraction or decimal text input into numbers.  

  var volumeObject = iDiskCalc(parsed_obj.radius, parsed_obj.height, inputUnits, parsed_obj.outputUnits);
  var resultHtml;

  if (volumeObject.outputUnits == "metric") {
    // produce the metric version of recipe
    return resultHtml = mCreateRecipeTableHtml(volumeObject);
  };
  console.log("our volumeObject.outputUnits should be imperial"+volumeObject.outputUnits == "imperial");
  
  if (volumeObject.outputUnits == "imperial") {
    // !!!  at this point volumeObject needs to be normalized to metric 
    // thru conversion.
    resultHtml = iCreateRecipeTableHtml(volumeObject);
  } 
  else {
    Logger.log("We should never get here 'Big old Error'");
    resultHtml = "<h3>Failed to create recipe...  ERROR</h3>";
  }

  console.log("out idisk.gs: iGetDiskRecipeFromWebAPP:*******************");
  // Logger.log("mGetCuboidRecipeFromWebAPP: html from server to send back: " + resultHtml);

  return resultHtml;
};

/**
 * This function will calculate a disk volume based on
 * imperial inputs, generating a volume based in units of either
 * imperial. At some point
 *
 */
function iDiskCalc(radius, height, inputUnits, outputUnits) {
  console.log("in idisk.gs: iDiskCalc:*******************");
  console.log("value parameters on call radius=" + radius + " height=" + height + " outputUnits=" + outputUnits + " inputUnits=" + inputUnits);
  // conversion factor to change cubic inches to cubic centimeters
  const CItoCCfactor= 16.3871;
  // conversion factor to change inches to centimeters
  const INCHTOCENT = 2.54;

  var volumeObject = new Object();
  volumeObject.ivolume = PI * radius * radius * height;
  volumeObject.iradius = radius;
  volumeObject.iheight = height;
  volumeObject.inputUnits = inputUnits;
  volumeObject.outputUnits = outputUnits;
  // convert imperial inches to metric centimeters
  volumeObject.volume = volumeObject.ivolume*CItoCCfactor;
  volumeObject.radius = volumeObject.iradius*INCHTOCENT;
  volumeObject.height = volumeObject.iheight*INCHTOCENT;

  console.log("raw volume in " + inputUnits + " cubic units = " + volumeObject.ivolume);
  console.log("raw volume in normalized metric cubic units = " + volumeObject.volume);
  console.log("out idisk.gs: iDiskCalc:*******************");

  return volumeObject;
}

