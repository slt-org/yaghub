
/**#####################################
  * Gets a json values from server-side input. 
  * Sends it to updateNumber to be updated.
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function mGetDiskRecipeFromWebAPP(element) {
  console.log("in mGetDiskRecipeFromWebAPP:*******************");
  console.log(element);
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
  console.log("json object parsed from serverside: radius=" + parsed_obj.radius + " height=" + parsed_obj.height+" units="+parsed_obj.units);

  var volumeObject = diskCalcMetric(parsed_obj.radius, parsed_obj.height, parsed_obj.units);
  var resultHtml;

  if (volumeObject.units == "metric") {
    // produce the metric version of recipe
    resultHtml = mCreateRecipeTableHtml(volumeObject);
  } else if (volumeObject.units == "imperial") {
    // produce the imperial version of recipe
    // need to take the volumeObject down the Imperial path.
    resultHtml = iCreateRecipeTableHtml(volumeObject);
  } else {
    Logger.log("We should never get here 'Big old Error'");
    resultHtml = "<h3>Failed to create recipe...  ERROR</h3>";
  }

  console.log("out getDiskRecipeFromWebAPP:*******************");
  // Logger.log("mGetCuboidRecipeFromWebAPP: html from server to send back: " + resultHtml);

  return resultHtml;
};

/**
 * This function will calculate a disk volume based on
 * centimeter inputs, generating a volume in cubic centimeters.
 *  
 */
function diskCalcMetric(radius, height, units) {
  console.log("in diskCalcMetric:*******************");
  console.log("value parameters on call radius=" + radius + " height=" + height+ " units=" + units);
  var volumeObject = new Object();
  volumeObject.volume = PI * radius * radius * height;
  volumeObject.radius = radius;
  volumeObject.height = height;
  volumeObject.units=units;

  console.log("raw volume in cm^3= " + volumeObject.volume);
  console.log("in diskCalcMetric:*******************");

  return volumeObject

}

