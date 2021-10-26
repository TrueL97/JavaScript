function setColor(color) {
    var alist = document.querySelectorAll("a");
    var i = 0;
    while (i < alist.length) {
        alist[i].style.color = color;
        i = i + 1;
    }
}
var Links = {
    setColor: function (color) {
        var alist = document.querySelectorAll("a");
        var i = 0;
        while (i < alist.length) {
            alist[i].style.color = color;
            i = i + 1;
        }
    },
};
var Body = {
    bodySetColor: function (color) {
        document.querySelector("body").style.color = color;
    },
    backgroundColor: function (color) {
        document.querySelector("body").style.backgroundColor = color;
    },
};
// function bodySetColor(color) {
//     document.querySelector("body").style.color = color;
// }
function backgroundColor(color) {
    document.querySelector("body").style.backgroundColor = color;
}
function nightDayHandler(self) {
    var target = document.querySelector("body");
    if (self.value === "night") {
        Body.backgroundColor("black");
        Body.bodySetColor("white");
        self.value = "day";
        Links.setColor("powderblue");
    } else {
        Body.backgroundColor("white");
        Body.bodySetColor("black");
        self.value = "night";

        Links.setColor("blue");
    }
}
