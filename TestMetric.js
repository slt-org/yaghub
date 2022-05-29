
function testReduction() {
  var obj = new Object();
  obj = JSON.parse("{\"cups\": 2, \"3qtrCup\": 1, \"halfCup\": 0, \"qtrCup\": 0, \"Tbl\":1, \"Tsp\":2, \"threeqtrTsp\":0, \"halfTsp\":0, \"qtrTsp\":1}");
  var testrunReduce = collectIngredientAmounts(obj);
  console.log(" Test convert values run :" + JSON.stringify(testrunReduce));
}


//main web function called from client side with json values 
function testCuboid_mGetCuboidRecipeFromWebAPP() {
  console.log("Tests for mGetCuboidRecipeFromWebAPP");
  //var testrun = mGetCuboidRecipeFromWebAPP('{"length":"15","width":"12","height":".3","units":"metric"}');
  //console.log(" Good values :"+JSON.stringify(testrun));
  testrun = mGetCuboidRecipeFromWebAPP('{"length":"11","width":"12","height":".3","units":"imperial"}');
  console.log(" With units set to imperial :" + JSON.stringify(testrun));
};

function testDisk_mGetDiskRecipeFromWebAPP() {
  //var testrun = mGetDiskRecipeFromWebAPP('{"radius":"10","height":".3","inputUnits":"metric",//"outputUnits":"metric"}');
  //console.log(" Test getDiskRecipeFromWebAPP metric run :"+JSON.stringify(testrun)); 
  //var testrun = mGetDiskRecipeFromWebAPP('{"radius":"10","height":".3","inputUnits":"metric","outputUnits":"imperial"}');
  //console.log(" Test getDiskRecipeFromWebAPP imperial run :" + JSON.stringify(testrun));
  // should be equivalent to "4 3/8"(4.375) inches radius and 1/4(.25) inch high. 
  var testrun = mGetDiskRecipeFromWebAPP('{"radius":"11.1125","height":".635","inputUnits":"metric","outputUnits":"imperial"}');
  console.log(" Test getDiskRecipeFromWebAPP imperial run :" + JSON.stringify(testrun));
};


function testCuboid_cuboidCalcMetric() {
  var testrun = cuboidCalcMetric(2, 2, .6);
  console.log(" Test cuboidCalcMetric run :" + JSON.stringify(testrun));

};

function testDisk_diskCalcMetric() {
  var testrun = diskCalcMetric(3, .6, "metric", "metric")
  console.log(" Test diskCalcMetric metric output run :" + JSON.stringify(testrun));
  testrun = diskCalcMetric(3, .6, "metric", "imperial");
  console.log(" Test diskCalcMetric imperial output run :" + JSON.stringify(testrun));
};

function testAny_getAnyVolumeRecipeFromWebAPP() {
  var testrun = getAnyVolumeRecipeFromWebAPP('{"volume":"10"}');
  console.log(" Test getAnyVolumeRecipeFromWebAPP run :" + JSON.stringify(testrun));
};

function testAny_anyVolumeCalcMetric() {
  var testrun = anyVolumeCalcMetric(10);
  console.log(" Test anyVolumeCalcMetric run :" + JSON.stringify(testrun));
};


