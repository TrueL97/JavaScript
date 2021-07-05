const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
    console.log(toDoInput);
const TODOS_LS = 'toDos';



function deleteToDo(event){
  //  constconsole.log(event.target.parentNode); //parentNode가 내가 찾는것
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

let toDos=[];

function saveToDos(){//자바스크립트는 local storage에 있는 모든 데이터를 string 으로 저장하려고 한다
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //오브젝트를 string로 변환
}

function paintToDo(text){
    const li =document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);

    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.placeholder="a";     //.value는 <>()<> ()가 바뀌는거 .innerText는 박스안에 이름이 바뀌는거
    toDoInput.value="";
    console.log(toDoForm);
}

function something(toDo){
    paintToDo(toDo.text);
}

function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos); //loadToDos를 오브젝트로 변환
       parsedToDos.forEach(something);

    }
}

    function init(){
        loadToDos();
        toDoForm.addEventListener("submit",handleSubmit);
    }
    init();
    