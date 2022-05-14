/**
 * this method takes json and turns it into
 * an html table of the MG recipe to be displayed to the user
 * json should have the 4 fields of glass,water,binder and liquid medium.
 */
function mCreateRecipeTableHtml(volumeObject) {
  console.log("mCreateRecipeTableHtml: object passed to createRecipe " + JSON.stringify(volumeObject));
  
  volumeObject = createBaseVolume(volumeObject);

  let text = "";

  if (volumeObject.units == "imperial") {
    console.log("mCreateRecipeTableHtml: needs to call function for Imperial transform");
    text = iCreateRecipeTableHtml(volumeObject);
  } else {
    volumeObject.units = "grams";
    // set this functionality up in the metric script space
    // todo move this to metric.gs and the corresponding function for imperial to imperial.gs 
    text = "<p><b>MG total volume:</b> " + volumeObject.volume.toFixed(1)+" cm<sup>3</sup>, <b>MG total weight:</b> " + volumeObject.total_weight.toFixed(1)+" "+volumeObject.units+"</p>"
      + "<h4> Batch Recipe</h4>"
      + "<table>"
      + "<tr><th>Ingredient  </th><th>&nbsp;</th><th>Amount</th><th>Units</th></tr>"
      + "<tr><td>Glass  </td><td></td><td>" + volumeObject.glass + "</td><td>" + volumeObject.units + "</td></tr>"
      + "<tr><td>Water  </td><td></td><td>" + volumeObject.water + "</td><td>" + volumeObject.units + "</td></tr>"
      + "<tr><td>Binder  </td><td></td><td>" + volumeObject.binder + "</td><td>" + volumeObject.units + "</td></tr>"
      + "<tr><td>Liquid Medium &nbsp;</td><td></td><td>" + volumeObject.liquid_medium + "</td><td>" + volumeObject.units + "</td></tr>"
      + "</table>";
  }

  return text;
};



