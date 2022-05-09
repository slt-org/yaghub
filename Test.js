//main web function called from client side with json values 
function test1(){

  console.log("Tests for getNumberFromWebAPP");
  var testrun = getNumberFromWebAPP('{"length":"10","width":"5","height":".3"}');
  console.log(" One value zero :"+testrun);
  // testrun = getNumberFromWebAPP('{"length":"1","width":"","height":"1"}');
  // console.log(" One value empty string :"+testrun);
};

function test2(){
   var testrun = cuboidCalcMetric(2,2,.6);
  console.log(" Test getNumberFromWebAPP run :"+testrun);
  
}

