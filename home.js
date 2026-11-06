
// 1. Input va divni chaqirib oldik
const inputDiv = document.getElementById("input");
const kunDiv = document.getElementById("kun");


function getTodayDate() {
    const today = new Date();

    const kun = today.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const sana = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return `${kun} ${sana}`;
}

async function getWeather() {

    
    const shaharNomi = inputDiv.value.trim();

  
    if (!shaharNomi) {
        alert("Iltimos shahar nomini kiriting");
        return;
    }

    const apiKey = "5dd2562c76a638e172d0cdc3eb1c0194";

   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(shaharNomi)}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                alert("Bunday shahar topilmadi!");
            } else {
                alert("Serverda xatolik yuz berdi!");
            }
            return;
        }

        const data = await response.json();

     
const obhavoDiv = document.querySelector(".ob_havo");

const weather = data.weather[0].main;
    
if (weather === "snow") {

    obhavoDiv.classList.remove("rain", "sun");
    obhavoDiv.classList.add("rain");

} else if (weather === "clouds") {

    obhavoDiv.classList.remove("snow", "sun");
    obhavoDiv.classList.add("snow");

} else {

    obhavoDiv.classList.remove("sun", "rain");
    obhavoDiv.classList.add("rain");

}


        const temp = Math.round(data.main.temp);
        const tempMax = Math.round(data.main.temp_max);
        const tempMin = Math.round(data.main.temp_min);

       
        const bugungiSana = getTodayDate();

        kunDiv.innerHTML = `
            <h3>${data.name}, ${data.sys.country ?? ""}</h3>

            <p>${bugungiSana}</p>

            <h1>${temp}°C</h1>

            <h3>${data.weather[0].main}</h3>

            <p>${data.weather[0].description}</p>

            <p>
                ${tempMax}°C / ${tempMin}°C
            </p>

        `;

    } catch (error) {
        console.log(error);
        alert("xatolik borr");
    }
}


inputDiv.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});


kunDiv.innerHTML = `
    <p>${getTodayDate()}</p>
`;


setInterval(() => {
    const sanaElement = kunDiv.querySelector(".bugungi-sana");

    if (sanaElement) {
        sanaElement.textContent = getTodayDate();
    }
}, 60000);
