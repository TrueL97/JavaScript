

// var character =
// document.getElementById("character");
var block= document.getElementById("block");
// function jump(){해서 html에 넣으면 전체클릭하면 점프함
//     character.classList.add("animate");
// }  
var character = document.querySelector('#character');


// moreBtn1.addEventListener('click', () => {
//     moreBtn1.classList.toggle('clicked');
//     title1.classList.toggle('clamp');
// });


window.addEventListener('keydown', function(e) {
    console.log(e.code);
if(e.code =='Space'){
    if(character.classList != 'animate'){
    character.classList.add('animate');
    }
    setTimeout(function(){
        character.classList.remove('animate');
    },1000);
}
});

var chackDead = setInterval(function(){
    var characterTop =
    parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    var blockLeft=
    parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    if(blockLeft <20 && blockLeft>0 && characterTop >=130){
        console.log(block.style.animation)
        block.style.animation="none";
        block.style.display="none";    
        alert("lose");
        }
},10);
