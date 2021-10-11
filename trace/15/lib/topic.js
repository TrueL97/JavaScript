var db = require("./db.js");
var template = require("./template.js");
var qs = require("querystring");
var sanitizeHtml = require("sanitize-html");
//불쾌한 부분을 지운다 ex)데이터 받을때 스크립트 형식으로 받으면 스크립트 부분을 지워준다
//사용자가 입력한 데이터들을 살균하자

exports.home = function (request, response) {
  //여러개 같이 제공

  db.query(`SELECT * FROM topic`, function (error, topics) {
    var title1 = "Welcome";
    var description1 = "Hello, node.js";
    var list = template.list(topics);
    var html = template.html(
      title1,
      list,
      `<h2>${title1}</h2>${description1}`,
      ` <a href="/create">create</a> `
    );

    response.writeHead(200);
    response.end(html);
  });
};

exports.page = function (request, response, queryData) {
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    var query = db.query(
      `select * from topic left join author on topic.author_id =author.id where topic.id=?`,
      [queryData],
      function (error2, topic) {
        console.log(topic);
        if (error2) {
          throw error2;
        }
        var title1 = topic[0].title;
        var description1 = topic[0].description;
        var list = template.list(topics);
        var html = template.html(
          sanitizeHtml(title1),
          list,
          `<h2>${sanitizeHtml(title1)}</h2>${sanitizeHtml(description1)}
              <p>by ${sanitizeHtml(topic[0].name)}</p>`,
          ` <a href="/create">create</a> 
              <a href="/update?id=${queryData}" >update</a>
             <form action="delete_process" method="post" >
               <input type="hidden" name="id" value="${queryData}">
               <input type="submit" value="delete">
             </form>
      `
        );
        console.log(query.sql);
        response.writeHead(200);
        response.end(html);
      }
    );
  });
};

exports.create = function (request, response) {
  db.query(`SELECT * FROM topic`, function (error, topics) {
    db.query("SELECT * FROM author", function (error2, authors) {
      var title1 = "Create";
      var list = template.list(topics);
      var html = template.html(
        title1,
        list,
        `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              ${template.authorSelect1(authors)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`,
        ` <a href="/create">create</a> `
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
    console.log("aaa" + post.title);
    var title = post.title;
    var description = post.description;

    db.query(
      `INSERT INTO topic (title, description, created, author_id)
      VALUES(?, ?, NOW(),?)`,
      [post.title, post.description, post.author],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end();
      }
    );
  });
};

exports.update = function (request, response, queryData) {
  db.query("SELECT * FROM topic", function (error2, topics) {
    // fs.readdir("./data", function (error, filelist) {
    //   var filteredId = path.parse(queryData).base;
    if (error2) {
      throw error2;
    }
    db.query(
      "SELECT * FROM topic where id =?",
      [queryData],
      function (error2, topic) {
        if (error2) {
          throw error2;
        }
        db.query("SELECT * FROM author", function (error2, authors) {
          var list = template.list(topics);
          // var title = queryData;
          // fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
          var html = template.html(
            topic[0].title,
            list,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value ="${topic[0].author_id}">
            <p><input type="text" name="title" placeholder="title" value="${
              topic[0].title
            }"></p>
            <p>
              <textarea name="description" placeholder="description">${
                topic[0].description
              }</textarea>
            </p>
            <p>
                ${template.authorSelect(authors, topic[0].author_id)}
            </p>
            <p>
              <input type="submit" value="submit">
            </p>
          </form>
            `,
            `<a href="/create">create</a><a href="/update?id=${topic[0].id}" >update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      }
    );
  });
};

exports.update_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    //request.on 은 post로  전송되는 데이터가 많을수롤 on사용방법을 제시한다

    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    // console.log(post);
    // var id = post.id;
    // var title = post.title;
    // var description = post.description;

    // fs.rename(`data/${id}`, `data/${title}`, function (error) {
    //   fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    //     response.writeHead(302, { Location: `/?id=${title}` });
    //     response.end();
    //   });
    // });

    db.query(
      "UPDATE topic SET title=?, description=?,author_id=? where id=?",
      [post.title, post.description, post.author, post.id],
      function (error, result) {
        response.writeHead(302, { Location: `/?id=${post.id}` });
        response.end();
      }
    );
  });
};

exports.delete_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    //request.on 은 post로  전송되는 데이터가 많을수롤 on사용방법을 제시한다

    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    // console.log(post);
    var id = post.id;
    // var filteredId = path.parse(id).base;
    db.query(
      "DELETE FROM topic WHERE id = ?",
      [post.id],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/` }); //콜백
        response.end();
      }
    );
    // fs.unlink(`data/${id}`, function (error) {
    //   response.writeHead(302, { Location: `/` });
    //   response.end();
    // });
  });
};
