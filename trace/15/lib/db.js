var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "opentutorials",
  port: 3307,
});
db.connect();

db.query("SELECT * FROM topic", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});
module.exports = db; //1개에만 제공
