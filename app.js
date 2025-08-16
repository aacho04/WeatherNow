//https://api.openweathermap.org/data/2.5/weather?q=germany&appid=c484af5350f4abfe22b87af3b2432134&units=metric
const apikey="c484af5350f4abfe22b87af3b2432134";
const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";



const input=document.querySelector("#city");
const btn=document.querySelector("#search");
btn.addEventListener("click",()=>{
    let city=input.value;
    checkWeather(city);

})

input.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        checkWeather(input.value);
    }
})

let data=null//so that everone can access it
let currentTheme="day";

async function checkWeather(city){
    const res=await fetch(url+city+`&appid=${apikey}`);
     data=await res.json();
    console.log(data);
    if(data.name!=undefined){
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=data.main.temp+"<sup>o</sup>C";
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind").innerHTML=data.wind.speed+" km/hr";
        updateIcon();
    }else{
        document.querySelector(".error").style.display="block";
         document.querySelector(".weather").style.display="none";
        
    }
    
    

}

function updateIcon(){
    let icon=data.weather[0].icon;
    base=icon.substring(0,2);
    let iconid=base+(currentTheme=="day"?"d":"n");
    document.querySelector(".w-icon").setAttribute("src",`https://openweathermap.org/img/wn/${iconid}@2x.png`);

}


 const toggle = document.getElementById('day-night-toggle');
 const body = document.body;
 const card=document.querySelector(".card");

        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                body.classList.remove('day');
                card.classList.remove('cday');
                card.classList.add('cnight');
                body.classList.add('night');
                currentTheme="night";
                updateIcon();
                
            } else {
                body.classList.remove('night');
                card.classList.remove('cnight');
                card.classList.add('cday');
                body.classList.add('day');
                currentTheme="day";
                updateIcon();

            }
        });








