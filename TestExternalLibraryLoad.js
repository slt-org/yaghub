
// this fails, maybe one of the other methods 

function testLoad(){
  console.log("start test");
  // loadJSFromServer();
  var result = math.fraction('9 7/8');
  console.log("result : "+result.toString());
}

// reference this article https://www.labnol.org/code/20380-load-external-javascript-with-eval
// Load JavaScript from External Server
function loadJSFromServer() {
  var url = 'https://pagecdn.io/lib/mathjs/10.5.3/math.min.js';
  var javascript = UrlFetchApp.fetch(url).getContentText();
  eval(javascript);
}