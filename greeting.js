const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");


function handleSubmit(event){
    event.preventDefault(); //이거쓰면 아무일도 일어나지 않는다. 이벤트 막음
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
    co
}

function saveName(text){
    localStorage.setItem(USER_LS,text); //브라우저에 저장
}

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText =`Hello ${text}`;
}

function loadname(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
            //he is not
    }else{
        //he is 
        paintGreeting(currentUser);
    }
}

function init(){
    loadname();
    
}
init();