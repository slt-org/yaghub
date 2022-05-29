/**#####################################
  * Gets a json values from server-side input. 
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function mGetCustomRecipeFromWebAPP(element) {
  console.log("in mGetCustomRecipeFromWebAPP:*******************");
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
  console.log("json object parsed from serverside: volume=" + parsed_obj.volume + " units=" + parsed_obj.units);

  var volumeObject = customCalcMetric(parsed_obj.volume,parsed_obj.units)
  var resultHtml = mCreateRecipeTableHtml(volumeObject)

  console.log("html from server to send back: " + resultHtml);

  return resultHtml;
};

/**
 * This function will calculate a disk volume based on
 * centimeter inputs, generating a volume in cubic centimeters.
 *  
 */
function customCalcMetric(volume, units) {
  console.log("value parameters on call volume=" + volume);
  var volumeObject = new Object();
  volumeObject.volume = Number(volume);
  volumeObject.units = units;

  console.log("raw volume in cm^3= " + volumeObject.volume);

  return volumeObject

}

