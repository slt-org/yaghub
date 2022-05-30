/**#####################################
  * Gets a json values from server-side input. 
  * Sends it to updateNumber to be updated.
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function mGetSlabRecipeFromWebAPP(element) {
  Logger.log("mGetSlabRecipeFromWebAPP: input of element from client side :")
  Logger.log(element);
  //Just a quick proof that the returned number value will be a text. Remove on production.
  Logger.log(`mGetSlabRecipeFromWebAPP: Returned json is: ${element}`, typeof element);

  /**
   * This all belongs under validation
   */
  if (element == null) {
    return `<em style='color:red'> You didn't input a number!`;
  }

  // Turn json text into json object
  var parsed_obj = JSON.parse(element);
  Logger.log("mGetSlabRecipeFromWebAPP: json object parsed from serverside: length="+parsed_obj.length+" width="+parsed_obj.width+" height="+parsed_obj.height
              +" outputUnits="+parsed_obj.outputUnits+" inputUnits="+parsed_obj.inputUnits);
  
  var volumeObject = slabCalcMetric(parsed_obj.length,parsed_obj.width,parsed_obj.height,parsed_obj.outputUnits,parsed_obj.inputUnits);
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
function slabCalcMetric(length,width,height,outputUnits,inputUnits){
  Logger.log("slabCalcMetric: value parameters on call length="+length+" width="+width+" height="+height+" outputUnits="+outputUnits+" inputUnits="+inputUnits);
  var volumeObject = new Object();
  volumeObject.volume = length*width*height;
  volumeObject.length=length;
  volumeObject.width=width;
  volumeObject.height=height;
  volumeObject.outputUnits=outputUnits;
  volumeObject.inputUnits=inputUnits;

  Logger.log("slabCalcMetric: raw volume in "+outputUnits+"= "+volumeObject.volume);

  return volumeObject
}

