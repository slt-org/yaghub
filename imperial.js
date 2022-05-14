/**
 * this method takes an object and turns it into 
 * an html table of the MG recipe with Imperial units to be displayed to the user
 * The volumeObject should be complete should and 
 * have the 4 fields of glass,water,binder and liquid medium.
 */
function iCreateRecipeTableHtml(volumeObject){     // a portion of this is duplicate code for metric and imperial
  console.log("iCreateRecipeTableHtml: object passed to createRecipe "+JSON.stringify(volumeObject));

  volumeObject = createBaseVolume(volumeObject);
  
  let text = "";

  // We need to translate from grams to imperial measurements of teaspoons ect.
  // for each ingredient. Then output the amount to table
  console.log("glass .................");
  var glassAmount  = formatIngredientList(convert(volumeObject.glass,GLASSCONV));
    console.log("water .................");
  var waterAmount  = formatIngredientList(convert(volumeObject.water,WATERCONV));
    console.log("binder .................");
  var binderAmount = formatIngredientList(convert(volumeObject.binder,BINDERCONV));
    console.log("medium .................");
  var mediumAmount = formatIngredientList(convert(volumeObject.liquid_medium,LMEDIUMCONV)); 

  Logger.log("glassAmount : "+glassAmount.toString());
  volumeObject.units = "grams";
  text =  "<p><b>MG total volume:</b> "+volumeObject.volume.toFixed(1)+" cm<sup>3</sup>, <b>MG total weight:</b> "+volumeObject.total_weight.toFixed(1)+" "+volumeObject.units+"</p>"
              + "<h4> Batch Recipe</h4>"
              + "<table>"
              +  "<tr><th>Ingredient</th> <th></th><th>Amount</th></tr>"
              +  "<tr><td>Glass</td><td> </td><td>&nbsp; "+glassAmount.toString()+"</td></tr>"
              +  "<tr><td>Water</td><td> </td><td>&nbsp; "+waterAmount.toString()+"</td></tr>"
              +  "<tr><td>Binder</td><td> </td><td>&nbsp; "+binderAmount.toString()+"</td></tr>"
              +  "<tr><td>Liquid Medium</td><td> </td><td>&nbsp; "+mediumAmount.toString()+"</td></tr>"
              + "</table>";

  return text;    
};

// finalObject has collected values from conversion
function formatIngredientList(formatObject){
  // Walk the possible values and format for 
  // html template.

  var cup = false;
  var tsp = false;
  var result = "";
  var glassAmountFormatted;
  if(formatObject.cups > 0){
    result = result+formatObject.cups+" ";
    cup = true;
  }
  if(formatObject.threeqtrCup > 0){
    result = result+"3/4";
    cup = true;
  }
  if(formatObject.halfCup > 0){
    result = result+"1/2";
    cup = true;
  }
  if(formatObject.qtrCup > 0){
    result = result+"1/4";
    cup = true;
  }
  if (cup == true){
    result = result+"cup + ";
  }
  if(formatObject.tblsp > 0){
    result = result+formatObject.tblsp+"tblsp + ";  
  }
  if(formatObject.tsp > 0){
    result = result+formatObject.tsp+" ";
    tsp = true;  
  }
  if(formatObject.threeqtrTsp > 0){
    result = result+"3/4";
    tsp = true;
  }
  if(formatObject.halfTsp > 0){
    result = result+"1/2";
    tsp = true;
  }
  if(formatObject.qtrTsp > 0){
    result = result+"1/4";
    tsp = true;
  }
  if (tsp == true){
    result = result+"tsp.";
  }

  return result;
}

/**
 * Take the converted input in json document and
 * create an object for ingredient amounts.
 * This will then be translated into html
 *  
 */
function collectIngredientAmounts(convertedObj) {
  // console.log("input object value " + convertedObj);
  var finalObject = new Object();
  for (const property in convertedObj) {
    // console.log(`${property}: ${convertedObj[property]}`);
    var name = property;
    var value = convertedObj[property];
    if (value > 0) {
      console.log("name: " + name + " value: " + value);
      finalObject[name]= value;
    }
  }
  return finalObject;
};

/**
 * convert ingredient weight in grams to imperial measurements.
 * @param {number} ingredientWeightInGrams
 */
function convert(ingredientWeightInGrams, ingredientConversionFactor) {
  console.log("input value in grams " + ingredientWeightInGrams + " input conversion factor " + ingredientConversionFactor);
  var tsp = ingredientWeightInGrams * ingredientConversionFactor;
  console.log("teaspoons from weight: " + tsp.toFixed(2));
  var conObj = new Object();
  conObj.cups = 0;         // 48 tsps
  conObj.threeqtrCup = 0;  // 36 tsps
  conObj.halfCup = 0;      // 24 tsps
  conObj.qtrCup = 0;       // 12 tsps
  conObj.tblsp = 0;        //  3 tsps
  conObj.threeqtrTsp = 0;  
  conObj.halfTsp = 0;
  conObj.qtrTsp = 0;
  conObj.tsp = 0;

  while (tsp > 48) {
    conObj.cups = conObj.cups + 1;
    tsp = tsp - 48;
  };

  if (tsp <= 47.99 && tsp >= 36) {
    conObj.threeqtrCup = 1;
    tsp = tsp - 36;
  };

  if (tsp <= 35.99 && tsp >= 24) {
    conObj.halfCup = 1;
    tsp = tsp - 24;
  };

  if (tsp <= 23.99 && tsp >= 12) {
    conObj.qtrCup = 1;
    tsp = tsp - 12;
  };

  while (tsp <= 11.99 && tsp >= 3) {
    conObj.tblsp = conObj.tblsp + 1;
    tsp = tsp - 3;
  };

  while (tsp < 2.99 && tsp > 1) {
    tsp = tsp.toFixed(2);
    conObj.tsp = conObj.tsp + 1;
    tsp = tsp - 1;
  };

  console.log("after here there is less than 1 teaspoon left. " + tsp.toFixed(2));

  if (tsp < 0.99 && tsp >= .75) {
    conObj.threeqtrTsp = conObj.threeqtrTsp + 1;
    tsp = 0;
  }

  if (tsp < .749 && tsp >= .50) {
    conObj.halfTsp = conObj.halfTsp + 1;
    tsp = 0;
  }

  if (tsp < .499 && tsp >= .15) {
    conObj.qtrTsp = conObj.qtrTsp + 1;
    tsp = 0;
  }
   return conObj;
};


