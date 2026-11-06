const inputDiv = document.getElementById("input");
const kunDiv = document.getElementById("kun");
const searchBtn = document.getElementById("search-btn");
const obhavoDiv = document.querySelector(".ob_havo");

function getTodayDate() {
    const today = new Date();
    const kun = today.toLocaleDateString("en-US", { weekday: "long" });
    const sana = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return `${kun}, ${sana}`;
}

async function getWeather() {
    const shaharNomi = inputDiv.value.trim();

    if (!shaharNomi) {
        alert("Iltimos, shahar nomini kiriting!");
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
        
      const mainWeather = data.weather[0].main.toLowerCase();


console.log("Hozirgi ob-havo turi:", mainWeather);


obhavoDiv.classList.remove("snow", "rain", "sun");


if (mainWeather.includes("snow")) {
    obhavoDiv.classList.add("snow");
} else if (
    mainWeather.includes("rain") || 
    mainWeather.includes("drizzle") || 
    mainWeather.includes("thunderstorm") || 
    mainWeather.includes("clouds") 
) {
    obhavoDiv.classList.add("rain");
} else {
    obhavoDiv.classList.add("sun");
}
        const temp = Math.round(data.main.temp);
        const tempMax = Math.round(data.main.temp_max);
        const tempMin = Math.round(data.main.temp_min);

        kunDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country ?? ""}</h2>
            <p class="sana">${getTodayDate()}</p>
            <h1>${temp}°C</h1>
            <h3>${data.weather[0].main}</h3>
            <p class="desc">${data.weather[0].description}</p>
            <p class="temp-range">Yuqori: ${tempMax}°C / Past: ${tempMin}°C</p>
        `;

    } catch (error) {
        console.error(error);
        alert("Xatolik yuz berdi. Internetga ulanishni tekshiring.");
    }
}


searchBtn.addEventListener("click", getWeather);
inputDiv.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Boshlang'ich holat
kunDiv.innerHTML = `
    <p class="sana">${getTodayDate()}</p>
    <p>Ob-havoni bilish uchun shahar nomini qidiring.</p>
`;