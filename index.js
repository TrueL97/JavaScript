//alert('im working. im js. gg');
/*onst a=221; //값을 바꿀 수 없게 하려면 const 사용 첫 사용은 const로 진짜 필요할때만 let
let b=a-5;
console.log(b);
const what = "Nicolas"
const monday = "Mon";
const nicoInfo = {
    name:"nico",
    age:33,
    gender:"Male",
    isHandosme:true,
    favMovies: ["along the gods",
    "LOTR","Oldboy"],
    favFood:[{name:"Kimchi",
    fatty:false},
    {name:"Cheese burger",fatty:true}]
}

console.log(nicoInfo.gender);
nicoInfo.gender = "Female"

console.log(nicoInfo.gender);

console.log(nicoInfo);

console.log(nicoInfo,console);

function sayHello(name,age){
    console.log(`hello ${name}you are ${age} years old`);
}
const greetNic = sayHello("Lee", 25);
console.log(greetNic);


const calculator ={
    plus:function(a,b){
        return a+b;
    }
}
const plus = calculator.plus(5,5);
console.log(plus); //16시작

const title= document.querySelector(".title");

title.innerHTML = "HI from js"
title.style.color="red";


console.dir(title);
document.title = "aaaaaa";
*/
const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

function handleClick() {
    title.classList.toggle(CLICKED_CLASS);
    //위에 코딩이랑 아래 코딩이랑 같음
    //const currentClass = title.className;
    /*onst hasClass = title.classList.contains(CLICKED_CLASS);
    if(!hasClass){
        //title.className = CLICKED_CLASS;
        title.classList.add(CLICKED_CLASS);
    }else{
        title.classList.remove(CLICKED_CLASS);
    }
    */
    console.log(currentClass);
}
// const BASE_COLOR="rgb(52, 73, 94)"; //or rgb(52, 73, 94)
// const OTHER_COLOR="#6c5ce7";
// /*function handleResize(event){
//     console.log(event);
// }
// */
// //window.addEventListener("resize",handleResize);

// function handleClick(){
//     console.log(title.style.color);
//     const currentColor = title.style.color;
//     if(currentColor === BASE_COLOR){
//         title.style.color = OTHER_COLOR;
//     }else{
//         title.style.color = BASE_COLOR;
//     }
// }

function init() {
    //init 함수는 어플리케이션을 초기화한다

    title.addEventListener("click", handleClick);
}
init();

function handleOffline() {
    console.log("lalala");
}
function handleOnline() {
    console.log("welcome back");
}
window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);

//const aac=prompt("ask") //prompt 유저에게 뭐를 물어볼 수 있는 언어 엄청 오래된 스크립트여서 이제 쓰지 않

//console.log(aac);
