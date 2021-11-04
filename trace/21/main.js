var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var mysql = require("mysql");
//pm2 start main.js --watch, pm2 log, pm2 monit

var template = require("./lib/template");
// console.log(template);
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
    var baseURL1 = "http://" + request.headers.host + "/"; //http://localhost:3000/
    var myURL = new URL(request.url, baseURL1);
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

                // list = templateList(filelist);
                // var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                // response.writeHead(200);
                // response.end(template);

                list = template.List(filelist);
                var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
        } else {
            fs.readdir("./data", function (error, filelist) {
                var filteredId = path.parse(queryData).name;
                console.log(filteredId);
                fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
                    var title = queryData;
                    var santizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description, {
                        allowedTags: ["h1"],
                    });
                    var list = template.List(filelist);
                    var html = template.HTML(
                        santizedTitle,
                        list,
                        `<h2>${santizedTitle}</h2>${sanitizedDescription}`,
                        `
                    <a href="/create">create</a>
                    <a href="/update?id=${santizedTitle}">update</a>
                    <form action="delete_process" method="post" onsubmit="asd">
                        <input type="hidden" name="id" value="${santizedTitle}">
                        <input type="submit" value="delete">
                    </form>`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (pathname === "/create") {
        fs.readdir("./data", function (error, filelist) {
            var title = "WEB - create";
            list = template.List(filelist);
            var html = template.HTML(
                title,
                list,
                `
            <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
            `,
                ""
            );
            response.writeHead(200);
            response.end(html);
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
    } else if (pathname === "/update") {
        fs.readdir("./data", function (error, filelist) {
            console.log(queryData);
            var filteredId = path.parse(queryData).name;
            fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
                var title = queryData;
                var list = template.List(filelist);
                var html = template.HTML(
                    title,
                    list,
                    `
                <form action="/update_process" method="post">
                <input type="hidden" type="text" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
                `,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathname === "/update_process") {
        var body = "";

        request.on("data", function (data) {
            body = body + data;
            // console.log(data);
        });
        request.on("end", function () {
            var post = qs.parse(body);
            // console.log(body); title=1&description=12
            // console.log(post.title);
            var title = post.title;
            var id = post.id;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function (error) {
                fs.writeFile(`data/${title}`, description, "utf8", (err) => {
                    if (err) throw err;
                    console.log("The file has been saved!");
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                });
            });
        });
    } else if (pathname === "/delete_process") {
        var body = "";

        request.on("data", function (data) {
            body = body + data;
            // console.log(data);
        });
        request.on("end", function () {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).name;
            fs.unlink(`data/${filteredId}`, function (err) {
                response.writeHead(302, { Location: `/` });
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end("Nor found");
    }
});
//리다이렉션: 어떤페이지로 왔을때 어떤 처리를 한다음에 다른 페이지로 팅겨버리는것
app.listen(3002);
