//api 가져와서 웹에 뿌려주게하는  js

const weather = document.querySelector(".js-weather");

const API_KEY ="b38ca1ca5fc1a90ed48088365cf184e2";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ //받아오면 
        return response.json(); //서버에서 온 json
    }).then(function(json){
        //console.log(json); 
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    }); //json이 준비되면
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position);
   const latitude =  position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cant access geo location");
}

function askForCoords(){ //위도 경도 가져오기
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError,{timeout:5000});//API임
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        //getWeather
        const  parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}



function init(){
    loadCoords();
}
init();