var fs = require("fs");

//readFileSync
// console.log("a");
// var result = fs.readFileSync("syntax/sample.txt", "utf8", );
// console.log(result);
// console.log("c");

console.log("a");
fs.readFilesy("syntax/sample1.txt", "utf8", function (err, result) {
  console.log(result);
});
console.log("c");
