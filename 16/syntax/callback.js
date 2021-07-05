// function a(){
//     console.log('a');
// }
var a = function () {
  console.log("a");
};

function slowfunc(callback) {
  console.log(callback());
  callback();
}

slowfunc(a);
