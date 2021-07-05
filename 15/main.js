var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var template = require("./lib/template.js");
var qs = require("querystring");

app.use(express.static("public"));

app.get("*", function (request, response, next) {
  //*:모든요청 get + * get방식으로 들어오는 요청에 대해서만 실행
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  }); //미들웨어 생성
});

//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get("/", function (request, response) {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.filelist(request.list);
  var html = template.html(
    title,
    list,
    `<h2>${title}</h2>${description}`,
    ` <a href="/create">create</a>
    <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">`
  );
  response.send(html);
});

app.get("/page/:pageId", function (request, response, next) {
  var filteredId = path.parse(request.params.pageId).base;
  //링크를통해서 정보를 알아내는것을 방지(외부에서 데이터가 들어오는 경우
  //ex) queryData를통해 데이터가 들어옴 readfile)
  console.log("a");
  fs.readFile(`data/${/*queryData*/ filteredId}`, "utf8", function (err, description) {
    if (err) {
      next(err);
    } else {
      console.log(request.list);
      var list = template.filelist(request.list);
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"], //사용자가 입력할때 h1만 사용가능하다는뜻
      });
      var html = template.html(
        title,
        list, //  delete_process앞에 /를 붙이면 최상위로 간다음 delete_process가붙는다
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `<a href="/create">create</a>
            <a href="/update/${sanitizedTitle}" >update</a>
            <form action="/delete_process" method="post" > 
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>
            `
      );
      response.send(html);
    }
  });
});

app.get("/create", function (request, response) {
  var title = "WEB - create";
  var list = template.filelist(request.list);
  var html = template.html(
    title,
    list,
    `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,
    ""
  );
  response.send(html);
});

app.post("/create_process", function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, "utf8", function (err) {
      response.writeHead(302, { Location: `/?id=${title}` });
      response.end();
    });
  });
});

app.get("/update/:pageId", function (request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
    var title = request.params.pageId;
    var list = template.filelist(request.list);
    var html = template.html(
      title,
      list,
      `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
      `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
    );
    //위의 코드에서 /update?id=${title} 부분은 /update/${title}로 수정 되어야 하는 버그입니다.
    response.send(html);
  });
});

app.post("/update_process", function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function (error) {
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 80!");
});
