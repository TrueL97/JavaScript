var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var mysql = require("mysql");
var template = require("./lib/templatedb");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "opentutorials",
    // multipleStatements: true, //명령문 ;있어도 여러개 들어감
    port: 3307,
});
db.connect();
//pm2 start main.js --watch, pm2 log, pm2 monit

var app = http.createServer(function (request, response) {
    var _url = request.url; //?id=html
    var baseURL1 = "http://" + request.headers.host + "/"; //http://localhost:3000/
    var myURL = new URL(request.url, baseURL1);
    const pathname = myURL.pathname;
    const queryData = myURL.searchParams.get("id");

    var title = queryData;
    console.log(pathname);

    if (pathname == "/") {
        if (queryData === null) {
            db.query(`SELECT * from topic `, function (err, topics) {
                var title = "Welcome";
                var description = "HEllo nodejs";
                var list = template.List(topics);
                var html = template.HTML(
                    title,
                    list,
                    `
                <h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                );

                response.writeHead(200);
                response.end(html);
            });
        } else {
            db.query(`SELECT * from topic `, function (err, topics) {
                if (err) {
                    throw err;
                }
                db.query(`SELECT * from topic left join author on topic.author_id = author.id where topic.id=?`, [queryData], function (err2, topic) {
                    if (err2) {
                        throw err2;
                    }

                    var title = topic[0].title;
                    var description = topic[0].description;
                    var list = template.List(topics);
                    var html = template.HTML(
                        title,
                        list,
                        `
                <h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)} by ${sanitizeHtml(topic[0].name)}`,
                        ` <a href="/create">create</a>
                                <a href="/update?id=${queryData}">update</a>
                                <form action="delete_process" method="post" onsubmit="asd">
                                    <input type="hidden" name="id" value="${queryData}">
                                    <input type="submit" value="delete">
                                </form>`
                    );

                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (pathname === "/create") {
        db.query(`SELECT * from topic `, function (err, topics) {
            var title = "Create";
            var list = template.List(topics);
            var html = template.HTML(
                title,
                list,
                `
            <h2><form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>`,
                `<a href="/create">create</a>`
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
            db.query(
                `insert INTO topic (title, description,created, author_id)
                        values(?,?, NOW(), ?)`,
                [post.title, post.description, 1],
                function (err, result) {
                    if (err) {
                        throw err;
                    }

                    response.writeHead(302, { Location: `/?id=${result.insertId}` }); //데이터 id값은 resurt.insertId로가능
                    response.end();
                }
            );
        });
    } else if (pathname === "/update") {
        db.query("select * from topic", function (err, topics) {
            if (err) {
                throw err;
            }
            db.query(`SELECT * from topic where id=?`, [queryData], function (err2, topic) {
                if (err2) {
                    throw err2;
                }
                var list = template.List(topics);
                var html = template.HTML(
                    topic[0].title,
                    list,
                    `
                <form action="/update_process" method="post">
                <input type="hidden" type="text" name="id" value="${topic[0].id}" />
            <p><input type="text" name="title" placeholder="title" placeholder="title" value="${topic[0].title}"></p>
            <p>
              <textarea name="description" placeholder="description">${topic[0].description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
                `,
                    `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathname === "/update_process") {
        var body = "";
        request.on("data", function (data) {
            body = body + data;
        });
        request.on("end", function () {
            var post = qs.parse(body);

            db.query("update topic set title =?, description =?, author_id=1 where id=?", [post.title, post.description, post.id], function (err, result) {
                response.writeHead(302, { Location: `/?id=${post.id}` });
                response.end();
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
            db.query("delete from topic where id = ?", [posr.id], function (err, result) {
                if (err) {
                    throw err;
                }
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
app.listen(3001);
