var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
// var path = require("path");
// var sanitizeHtml = require("sanitize-html"); //암호화
var db = require("./lib/db.js");
var topic = require("./lib/topic.js");
var author = require("./lib/author.js");

var app = http.createServer(function (request, response) {
  //request:요청할때 웹브라우저가 보낸 정보들
  //response:응답할때 우리가 웹브라우저에 보낼 정보들

  var _url = request.url; //?id=html

  var baseURL = "http://" + request.headers.host + "/"; //http://localhost:3000/
  var myURL1 = new URL(request.url, baseURL);
  const pathname = myURL1.pathname;
  const queryData = myURL1.searchParams.get("id");

  //const myURL = new URL("http://localhost:3000" + _url);
  //const queryData = myURL.searchParams.get("id");
  // const pathname = myURL.pathname.charAt(0);
  // console.log(myURL);
  // var queryData = url.parse(_url, true).query;
  // console.log(url.parse(_url, true).query.id);

  if (_url == "/") {
    title = "Welcome";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  // console.log("aaa" + pathname);
  // response.writeHead(200);
  // console.log(myURL1);
  if (pathname === "/") {
    // console.log(queryData);
    if (queryData === null) {
      // fs.readdir("./data", function (error, filelist) {
      //   console.log(filelist);
      //   var title1 = "Welcome";
      //   var description1 = "Hello, node.js";
      //   /* var list = template.list(filelist);
      //   var template = templateHTML(
      //     title1,
      //     list,
      //     `<h2>${title1}</h2>${description1}`,
      //     ` <a href="/create">create</a> `
      //   );
      //   */
      //   var list = template.list(filelist);
      //   var html = template.html(
      //     title1,
      //     list,
      //     `<h2>${title1}</h2>${description1}`,
      //     ` <a href="/create">create</a> `
      //   );
      //   response.writeHead(200);
      //   response.end(html);
      // });
      topic.home(request, response);
    } else {
      topic.page(request, response, queryData);
      // fs.readdir("./data", function (error, filelist) {
      //   var filteredId = path.parse(queryData).base;
      //   //링크를통해서 정보를 알아내는것을 방지(외부에서 데이터가 들어오는 경우
      //   //ex) queryData를통해 데이터가 들어옴 readfile)
      //   console.log(filelist);
      //   var list = template.list(filelist);
      //   var title = queryData;
      //   fs.readFile(
      //     `data/${/*queryData*/ filteredId}`,
      //     "utf8",
      //     function (err, description) {
      //       var sanitizedTitle = sanitizeHtml(title);
      //       var sanitizedDescription = sanitizeHtml(description, {
      //         allowedTags: ["h1"],
      //       });
      //       var html = template.html(
      //         title,
      //         list,
      //         `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
      //         `<a href="/create">create</a>
      //       <a href="/update?id=${sanitizedTitle}" >update</a>
      //       <form action="delete_process" method="post" >
      //         <input type="hidden" name="id" value="${sanitizedTitle}">
      //         <input type="submit" value="delete">
      //       </form>
      //       `
      //       );
      //       response.writeHead(200);
      //       response.end(html);
      //     }
      //   );
      // });
    }
  } else if (pathname === "/create") {
    topic.create(request, response);
  } else if (pathname === "/create_process") {
    // // response.writeHead
    topic.create_process(request, response);
  } else if (pathname === "/update") {
    topic.update(request, response, queryData);
  } else if (pathname === "/update_process") {
    topic.update_process(request, response);
  } else if (pathname === "/delete_process") {
    topic.delete_process(request, response);
  } else if (pathname === "/author") {
    author.home(request, response);
  } else if (pathname === "/author/create_process") {
    author.create_process(request, response);
  } else if (pathname === "/author/update") {
    author.update(request, response);
  } else if (pathname === "/author/update_process") {
    author.update_process(request, response);
  } else if (pathname === "/author/delete_process") {
    author.delete_process(request, response);
  } else if (pathname === "/a") {
    console.log("aaa");
    fs.readFile("html.html", "utf8", function (err, data) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
