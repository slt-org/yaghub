/**#####################################
  * Gets a json values from server-side input. 
  * Sends it to updateNumber to be updated.
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function mGetCuboidRecipeFromWebAPP(element) {
  Logger.log("mGetCuboidRecipeFromWebAPP: input of element from client side :")
  Logger.log(element);
  //Just a quick proof that the returned number value will be a text. Remove on production.
  Logger.log(`mGetCuboidRecipeFromWebAPP: Returned json is: ${element}`, typeof element);

  /**
   * This all belongs under validation
   */
  if (element == null) {
    return `<em style='color:red'> You didn't input a number!`;
  }

  // Turn json text into json object
  var parsed_obj = JSON.parse(element);
  Logger.log("mGetCuboidRecipeFromWebAPP: json object parsed from serverside: length="+parsed_obj.length+" width="+parsed_obj.width+" height="+parsed_obj.height+" units="+parsed_obj.units);
  
  var volumeObject = cuboidCalcMetric(parsed_obj.length,parsed_obj.width,parsed_obj.height,parsed_obj.units);
  var resultHtml;

  if(volumeObject.units == "metric"){
    // produce the metric version of recipe
    resultHtml = mCreateRecipeTableHtml(volumeObject);
  }else if (volumeObject.units == "imperial") {
    // produce the imperial version of recipe
    // need to take the volumeObject down the Imperial path.
    resultHtml = iCreateRecipeTableHtml(volumeObject);
  }else {
    Logger.log("We should never get here 'Big old Error'");
     resultHtml = "Failed to create recipe...  ERROR";
  }

  // Logger.log("mGetCuboidRecipeFromWebAPP: html from server to send back: " + resultHtml);

  return resultHtml;
};

/**
 * This function will calculate a disk volume based on
 * centimeter inputs, generating a volume in cubic centimeters.
 *  @param {string} length - number as text.
 *  @param {string} width - number as text.
 *  @param {string} height - number as text.
 *  @return {object} contains input values and calculated volume. 
 */
function cuboidCalcMetric(length,width,height,units){
  Logger.log("cuboidCalcMetric: value parameters on call length="+length+" width="+width+" height="+height+" units="+units);
  var volumeObject = new Object();
  volumeObject.volume = length*width*height;
  volumeObject.length=length;
  volumeObject.width=width;
  volumeObject.height=height;
  volumeObject.units=units;

  Logger.log("cuboidCalcMetric: raw volume in "+units+"= "+volumeObject.volume);

  return volumeObject
}

