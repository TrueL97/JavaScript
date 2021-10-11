var members = ["lee", "yun", "sik"];
console.log(members[1]);

var i = 0;
while (i < members.length) {
  console.log(members[i]);
  i = i + 1;
}

var roles = {
  programmer: "lee",
  designer: "yun",
  manager: "hoya",
};
console.log(roles.designer);

for (var name in roles) {
  console.log("object ->", name, "value ->", roles[name]);
}
