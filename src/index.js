import "./styles.css";
import img from "../imgs/cloud.png";
import img2 from "../imgs/arrow.png";
import img3 from "../imgs/cloud-wind.png";

let locationInput = document.querySelector("#location-input");
locationInput.value = "London";
let units = "metric";

getWeather().then((data) => {
  updateDOM(data);
});

document.querySelector("#location-btn").addEventListener("click", () => {
  updateDOM();
});

async function getWeather() {
  const API_KEY = "8bee596d3044034ff720012076efd8f7";
  let search = locationInput.value;
  let url = `http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&q=${search}&units=${units}`;
  let response = await fetch(url, { mode: "cors" });
  let data = await response.json();
  return data;
}

function updateDOM() {
  getWeather().then((data) => {
    let degString = units == "metric" ? "\xB0" : "\xB0" + "F";
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.textContent = `Current: ${
      Math.round(data.main.temp) + degString
    }`;
    let maxTemp = document.querySelector("#max-temp");
    maxTemp.textContent = `Max: ${Math.round(data.main.temp_max) + degString}`;
    let minTemp = document.querySelector("#min-temp");
    minTemp.textContent = `Min: ${Math.round(data.main.temp_min) + degString}`;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.textContent = `${
      Math.round(data.wind.speed) + (units == "metric" ? " m/s" : " mph")
    } `;
    let windDirection = document.querySelector("#wind-direction");
    windDirection.textContent = `${Math.round(data.wind.deg)}\xB0`;
    let directionImg = document.querySelector("#wind-arrow");
    directionImg.style.transform = `rotate(${data.wind.deg}deg)`;
    let city = document.querySelector("#city-header");
    city.textContent = data.name;
  });
}

let metricBtn = document.querySelector("#metric-btn");
let imperialBtn = document.querySelector("#imperial-btn");
metricBtn.addEventListener("click", () => {
  metricBtn.classList = "active";
  imperialBtn.classList = "";
  units = "metric";
  updateDOM();
});

imperialBtn.addEventListener("click", () => {
  imperialBtn.classList = "active";
  metricBtn.classList = "";
  units = "imperial";
  updateDOM();
});
