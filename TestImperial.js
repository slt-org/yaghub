
//main web function called from client side with json values 
function testDisk_mGetDiskRecipeFromWebAPP(){
  console.log("Tests for mGetCuboidRecipeFromWebAPP");
  //var testrun = mGetCuboidRecipeFromWebAPP('{"length":"15","width":"12","height":".3","units":"metric"}');
  //console.log(" Good values :"+JSON.stringify(testrun));
  testrun = mGetDiskRecipeFromWebAPP('{"radius":"10","height":".3","units":"imperial"}');
  console.log(" With units set to imperial :"+JSON.stringify(testrun));
};


/**
 * test how we can reduce the total amount teaspoons to 
 * Cups & fractions,tablespoons and teaspoons and fractions.
 */
function testReduction(){
  var obj = new Object();
  obj = JSON.parse("{\"cups\": 2, \"threeqtrCup\": 1, \"halfCup\": 0, \"qtrCup\": 0, \"Tbl\":1, \"Tsp\":2, \"threeqtrTsp\":0, \"halfTsp\":0, \"qtrTsp\":1}");
  var testrunReduce = collectIngredientAmounts(obj);
  console.log(" Test convert values run :"+JSON.stringify(testrunReduce));
}

function testFormat(){
  var obj = new Object();
  obj = JSON.parse("{\"cups\": 2, \"threeqtrCup\": 1, \"halfCup\": 0, \"qtrCup\": 0, \"tblsp\":1, \"tsp\":2, \"threeqtrTsp\":0, \"halfTsp\":0, \"qtrTsp\":1}");
  var testrunformat = formatIngredientList(obj); 
  console.log(" Test imperial format run :"+JSON.stringify(testrunformat));
}



// imperial measurements
function testConversion(){
  var MGwt = 430; // grams
  var t = new Object();
  t.glass = .614*MGwt;
  t.water = .326*MGwt;
  t.binder = .032*MGwt;
  t.medium = .027*MGwt;
  
  // each testrun per ingredient converts metric weight values to teaspoons
  // the total teaspoons are then tranformed into cups,fractions 
  // of cups,tablespoons,teaspoons and fractions of teaspoons.
  var testrunGlass = convert(t.glass,0.232);
  console.log(" Test convert Glass run :"+JSON.stringify(testrunGlass));
  var testrunGlassConvert = collectIngredientAmounts(testrunGlass);
  console.log(" Test convert Glass run part B:"+JSON.stringify(testrunGlassConvert));
  console.log("****************************************************");
  var testrunH2o = convert(t.water,0.236);
  console.log(" Test convert H2O run :"+JSON.stringify(testrunH2o));
  var testrunH2oConvert = collectIngredientAmounts(testrunH2o);
  console.log(" Test convert H2O run part B:"+JSON.stringify(testrunH2oConvert));
  console.log("****************************************************");
  var testrunBinder = convert(t.binder,0.416);
  console.log(" Test convert Binder run :"+JSON.stringify(testrunBinder));
  var testrunBinderConvert = collectIngredientAmounts(testrunBinder);
  console.log(" Test convert Binder run part B:"+JSON.stringify(testrunBinderConvert));
  console.log("****************************************************");
  var testrunMedium = convert(t.medium,0.2);
  console.log(" Test convert Medium run :"+JSON.stringify(testrunMedium));
  var testrunMediumConvert = collectIngredientAmounts(testrunMedium);
  console.log(" Test convert Medium run part B:"+JSON.stringify(testrunMediumConvert));
  console.log("****************************************************");
}
