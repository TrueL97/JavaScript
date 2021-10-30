var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
//pm2 start main.js --watch, pm2 log, pm2 monit
function templateHTML(title, list, body) {
    return `
  <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">create</a>
      <h2>${title}</h2>
      <p>${body}</p>
      
    </body>
    </html>
    `;
}

function templateList(filelist) {
    var list = "<ul>";
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + "</ul>";
    return list;
}

var app = http.createServer(function (request, response) {
    var _url = request.url; //?id=html

    var baseURL = "http://" + request.headers.host + "/"; //http://localhost:3000/
    var myURL = new URL(request.url, baseURL);
    const pathname = myURL.pathname;
    const queryData = myURL.searchParams.get("id");
    var title = queryData;
    console.log(pathname);
    // if (_url == "/") {
    //     _url = "/index.html";
    //     title = "welcome ";
    // }
    // if (_url == "/favicon.ico") {
    //     return response.writeHead(404);
    // }
    if (pathname == "/") {
        if (queryData === null) {
            fs.readdir("./data", function (error, filelist) {
                var title = "welcome";
                var description = "hello, node.js";
                list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${description}</h2>`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir("./data", function (error, filelist) {
                fs.readFile(`data/${queryData}`, "utf8", function (err, description) {
                    var title = queryData;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathname === "/create") {
        fs.readdir("./data", function (error, filelist) {
            var title = "WEB - create";
            list = templateList(filelist);
            var template = templateHTML(
                title,
                list,
                `
            <form action="http://localhost:3000/create_process" method="post">
            <p><input type="text" name="title" placeholder="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
            `
            );
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === "/create_process") {
        var body = "";
        request.on("data", function (data) {
            body = body + data;
        });
        request.on("end", function () {
            var post = qs.parse(body);
            // console.log(body); title=1&description=12
            // console.log(post); //[Object: null prototype] { title: '1', description: '12' }
            // console.log(post.title);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, "utf8", (err) => {
                if (err) throw err;
                console.log("The file has been saved!");
                response.writeHead(302, { Location: `/?id=${title}` });
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end("Nor found");
    }
});
//리다이렉션: 어떤페이지로 왔을때 어떤 처리를 한다음에 다른 페이지로 팅겨버리는것
app.listen(3000);
