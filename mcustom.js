/**#####################################
  * Gets a json values from server-side input. 
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function mGetCustomRecipeFromWebAPP(element) {
  console.log("in mcustom.gs:mGetCustomRecipeFromWebAPP:*******************");
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
  console.log("json object parsed from serverside: volume=" + parsed_obj.volume + " outputUnits=" + parsed_obj.outputUnits+ " inputUnits=" + parsed_obj.inputUnits);

  var volumeObject = customCalcMetric(parsed_obj.volume,parsed_obj.outputUnits,parsed_obj.inputUnits);
  var resultHtml;
  
  if(volumeObject.outputUnits == "metric"){
    // produce the metric version of recipe
    resultHtml = mCreateRecipeTableHtml(volumeObject);
  }else if (volumeObject.outputUnits == "imperial") {
    // produce the imperial version of recipe
    // need to take the volumeObject down the Imperial path.
    resultHtml = iCreateRecipeTableHtml(volumeObject);
  }else {
    Logger.log("We should never get here 'Big old Error'");
    resultHtml = "Failed to create recipe...  ERROR";
  }
  console.log("out mcustom.gs:mGetCustomRecipeFromWebAPP:*******************");
  
  return resultHtml;

};

/**
 * This function will calculate a disk volume based on
 * centimeter inputs, generating a volume in cubic centimeters.
 *  
 */
function customCalcMetric(volume,outputUnits,inputUnits) {
  console.log("value parameters on call volume=" + volume);
  var volumeObject = new Object();
  volumeObject.volume = Number(volume);
  volumeObject.outputUnits = outputUnits;
  volumeObject.inputUnits = inputUnits;

  console.log("raw volume in "+inputUnits+" : "+ volumeObject.volume);

  return volumeObject

}

