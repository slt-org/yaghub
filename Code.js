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

/**#####################################
  * Gets a json values from server-side input. 
  * Sends it to updateNumber to be updated.
  * Result will be returned server-side.
  *
  * @param {string} element - json as text from server-side
  * @return {string} as html for MG batch recipe.
  */
function getNumberFromWebAPP(element) {
  console.log(element);
  //Just a quick proof that the returned number value will be a text. Remove on production.
  console.log(`Returned json is: ${element}`, typeof element);

  // let num = parseInt(element); //Change text of num to number.

  /**
   * This all belongs under validation
   */
  //If the parsed number is a number, return calculated number otherwise return error.
  //if(Number.isInteger(num)){
  //    return updateNumber_(num);
  //};
  if (element == null) {
    return `<em style='color:red'> You didn't input a number!`;
  }

  // Turn json text into json object
  var parsed_obj = JSON.parse(element);
  console.log("json object parsed from serverside: length="+parsed_obj.length+" width="+parsed_obj.width+" height="+parsed_obj.height);
  
  var volumeObject = cuboidCalcMetric(parsed_obj.length,parsed_obj.width,parsed_obj.height)
  var resultHtml = createRecipeTableHtml(volumeObject)

  console.log("html from server to send back: " + resultHtml);

  return resultHtml;
};

/**
 * This function will calculate a disk volume based on
 * centimeter inputs, generating a volume in cubic centimeters.
 *  
 */
function diskCalcMetric(radius,height){
  console.log("value parameters on call radius="+radius+" height="+height);
  var volume = new Object();

}

/**
 * This function will calculate a disk volume based on
 * centimeter inputs, generating a volume in cubic centimeters.
 *  @param {string} length - number as text.
 *  @param {string} width - number as text.
 *  @param {string} height - number as text.
 *  @return {object} contains input values and calculated volume. 
 */
function cuboidCalcMetric(length,width,height){
  console.log("value parameters on call length="+length+" width="+width+" height="+height);
  var volumeObject = new Object();
  volumeObject.volume = length*width*height;
  volumeObject.lenght=length;
  volumeObject.width=width;
  volumeObject.height=height;
  volumeObject.units="cm^3";

  console.log("raw volume in cm^3= "+volumeObject.volume);

  return volumeObject
}

/**
 * this method takes json and turns it into
 * an html table of the MG recipe to be displayed to the user
 * json should have the 4 fields of glass,water,binder and liquid medium.
 */
function createRecipeTableHtml(volumeObject){
  console.log("object passed to createRecipe "+volumeObject);
  // The total volume multiplied by 2 (the sg of MG) will give you the weight
  //  of the MG needed to fill the volume.
  // Now multiply the total weight by the ratio for each ingredient.
  // That we give you the weight amount for each ingredient.
  var total_weight = volumeObject.volume * 2;
  var glass = (total_weight * GLASS).toFixed(1); // grams of glass powder to use
  var water = (total_weight * WATER).toFixed(1);
  var binder = (total_weight * BINDER).toFixed(1);
  var liquid_medium = (total_weight * LMEDIUM).toFixed(1);
  var units="grams"
  
  
  let text =  "<p><b>MG total volume:</b> "+volumeObject.volume.toFixed(1)+", <b>MG total weight:</b> "+total_weight.toFixed(1)+"</p>"
              + "<h4> Batch Recipe</h4>"
              + "<table>"
              +  "<tr><th>Ingredient</th><th>Ratio</th><th>Amount</th><th>Units</th></tr>"
              +  "<tr><td>Glass</td><td>.614</td><td>"+glass+"</td><td>"+units+"</td></tr>"
              +  "<tr><td>Water</td><td>.326</td><td>"+water+"</td><td>"+units+"</td></tr>"
              +  "<tr><td>Binder</td><td>.032</td><td>"+binder+"</td><td>"+units+"</td></tr>"
              +  "<tr><td>Liquid Medium</td><td>.027</td><td>"+liquid_medium+"</td><td>"+units+"</td></tr>"
              + "</table>";

  return text;    
};



/**#####################################
  * This function is an example of a location you can update your value in.
  *
  * @param {num} num - number from getNumberFromWebAPP()
  * @return {num} contains evaluated number.
  */
function updateNumber_(num) {
  return num + num;
};