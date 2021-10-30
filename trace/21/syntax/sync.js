var fs = require("fs");

//readFileSync

// console.log("a");
// var result = fs.readFileSync("sample.txt", "utf8"); //readFileSync는 리턴 값을 준다
// console.log(result);
// console.log("c");

console.log("a");
fs.readFile("sample.txt", "utf8", function (err, result) {
    //readFile은 리턴 값을 주지 않기 떄문에 var result 를 없앤다 function(err,result) 이게 콜백
    console.log(result);
}); //sync 가없으면 비동기적
console.log("c");
console.log("c");
console.log("c");
console.log("c");
console.log("c");
