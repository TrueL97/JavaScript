var Links = {
  setColor: function (color) {
    //   var alist = document.querySelectorAll("a");
    //   for (i = 0; i < alist.length; i++) {
    //     alist[i].style.color = color;
    //   }
    // }
    $("a").css("color", color);
  },
};

var Body = {
  setColor: function (color) {
    target.style.color = color;
  },
  setBackgrouneColor: function (color) {
    target.style.backgroundColor = color;
  },
};

function nightDayHandler(self) {
  this.target = document.querySelector("body");
  console.log(self);
  if (self.value === "night") {
    console.log("aaa");
    Body.setBackgrouneColor("black");
    Body.setColor("white");
    self.value = "day";
    Links.setColor("powderblue");
  } else {
    Body.setBackgrouneColor("white");
    Body.setColor("black");
    self.value = "night";
    Links.setColor("blue");
  }
}
