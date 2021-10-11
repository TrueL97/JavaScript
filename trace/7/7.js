const moreBtn1 = document.querySelector(".info .metadata .moreBtn");
const title1 = document.querySelector(".info .metadata .title");
console.log("aaa");
moreBtn1.addEventListener("click", () => {
  moreBtn1.classList.toggle("clicked");
  title1.classList.toggle("clamp");
});
