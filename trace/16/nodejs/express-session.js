var express = require("express");
var parseurl = require("parseurl");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

var app = express();

app.use(
    //미들웨어
    //사용자의 요청이있을때 마다 밑코드를 실행
    session({
        //기본적으로 메모리에 들어가서 휘발성임
        secret: "asadlfkj!@#!@#dfgasdg",
        resave: false, //세션 데이터가 바뀌기 전까지 세션저장소에 저장하지 않는다
        saveUninitialized: true, //(true)세션이 필요하기 전까지는 세션을 구동하지않는다 false사용하면 세션이 필요없어
        // 구동하시 떄문에 서버에 큰부담을 준다
        store: new FileStore(), //이걸 사용했을때 sesseions 가 계속 생성되는데 이유를 모르겠음
    })
);

app.get("/", function (req, res, next) {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views : ${req.session.num}`);
});

app.listen(3000, function () {
    console.log("3000!");
});
