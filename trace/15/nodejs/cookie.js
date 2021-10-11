var http = require("http");
var cookie = require("cookie");
http
  .createServer(function (request, response) {
    if (request.headers.cookie !== undefined) {
      var cookies = cookie.parse(request.headers.cookie);
    } else {
    }

    console.log(cookies);
    response.writeHead(200, {
      "Set-Cookie": [
        "yummy_cookie=choco",
        "tasty_cookie=strawberry",
        `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`, //30 days
        "Secure=Secure; Secure", //https일때만 쿠키를 만들어줌 request 헤더쪽에 없음
        "HttpOnly=HttpOnly;HttpOnly", //웹브라우저가 웹서버와 통신할때만 쿠키를 알 수 있음
        "Path=Path;Path=/cookie", //디렉토리를 지정하면 그디렉토리와 그디렉토리의 아래에서만 패스가 생긴다, 어느 패스에만 제안할 것인가
        "Domain=Domain;Domain=o2.org", //o2.org, sub.o2.org 도메인 에서만 쿠키가 살아있음
      ],
    }); //웹브라우저로 보낸다
    response.end("cookie");
  })
  .listen(3000);
