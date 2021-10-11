var db = require("./db.js");
var template = require("./template.js");
var qs = require("querystring");
exports.home = function (request, response) {
  //여러개 같이 제공

  db.query(`SELECT * FROM topic`, function (error, topics) {
    db.query(`SELECT * FROM author`, function (error2, authors) {
      var title1 = "author";
      var list = template.list(topics);
      var html = template.html(
        title1,
        list,
        `
        ${template.authorTable(authors)}
        <style>
            table{
                border-collapse:collapse;
            }
            td{
                border:1px solid black;
            }
        </style>
        <form action = 'author/create_process' method = 'POST'>
            <p>
                <input type='text' name='name' placeholder='name'>
            </p>
            <p>
                <textarea name='profile'placeholder='description1'></textarea>
            </p>
            <p>
                <input type='submit' value='Create'>
            </p>
        </form>
        `
      );

      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    //request.on 은 post로  전송되는 데이터가 많을수롤 on사용방법을 제시한다

    body = body + data; // body랑 안합치면 buffer 이런식으로 나옴
  });
  request.on("end", function () {
    var post = qs.parse(body);
    console.log(post);
    var title = post.title;
    var description = post.description;

    db.query(
      `INSERT INTO author (name, profile)
        VALUES(?,?)`,
      [post.name, post.profile],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};

exports.update = function (request, response) {
  //여러개 같이 제공

  db.query(`SELECT * FROM topic`, function (error, topics) {
    db.query(`SELECT * FROM author`, function (error2, authors) {
      var baseURL = "http://" + request.headers.host + "/"; //http://localhost:3000/
      var myURL1 = new URL(request.url, baseURL);
      const pathname = myURL1.pathname;
      const queryData = myURL1.searchParams.get("id");
      db.query(
        `SELECT * FROM author where id=?`,
        [queryData],
        function (error3, author) {
          if (error3) {
            throw error3;
          }
          console.log(author[0].name);
          var title1 = "author";
          var list = template.list(topics);
          var html = template.html(
            title1,
            list,
            ` ${template.authorTable(authors)}
          <style>
              table{
                  border-collapse:collapse;
              }
              td{
                  border:1px solid black;
              }
          </style>
          <form action = '/author/update_process' method = 'POST'>
              <p>
                <input type='hidden' name='id' value='${queryData}';
              </p>
              <p>
                   <input type='text' name='name' value='${
                     author[0].name
                   }'  placeholder='name1'>
              </p>
              <p>
                  <textarea name='profile' 
                  
                placeholder='descriptiona'>${author[0].profile}</textarea>
              </p>
              <p>
                  <input type='submit' value="Update">
              </p>
          </form>
          `
          );

          response.writeHead(200);
          response.end(html);
        }
      );
    });
  });
};

exports.update_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    //request.on 은 post로  전송되는 데이터가 많을수롤 on사용방법을 제시한다

    body = body + data; // body랑 안합치면 buffer 이런식으로 나옴
  });
  request.on("end", function () {
    var post = qs.parse(body);
    // console.log(post);

    db.query(
      `UPDATE author SET name=?, profile=? where id=?`,
      [post.name, post.profile, post.id],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};

exports.delete_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    //request.on 은 post로  전송되는 데이터가 많을수롤 on사용방법을 제시한다

    body = body + data; // body랑 안합치면 buffer 이런식으로 나옴
  });
  request.on("end", function () {
    var post = qs.parse(body);
    // console.log(post);
    db.query(
      `delete from topic where author_id=?`,
      [post.id],
      function (err, result1) {
        if (err) {
          throw err;
        }
        db.query(
          `delete from author where id=?`,
          [post.id],
          function (error, result) {
            if (error) {
              throw error;
            }
            response.writeHead(302, { Location: `/author` });
            response.end();
          }
        );
      }
    );
  });
};
