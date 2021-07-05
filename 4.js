    function changeCity(){
            let city = document.getElementById("city").value;
            document.getElementById("region_02").style.display="none";
            document.getElementById("region_064").style.display="none";
            document.getElementById("region_"+city).style.display="";
        }