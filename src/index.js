import "./styles.css";
import img from "../imgs/cloud.png";
import img2 from "../imgs/arrow.png";
import img3 from "../imgs/cloud-wind.png";

let locationInput = document.querySelector("#location-input");
locationInput.value = "London";
getWeather().then((data) => {
  updateDOM(data);
});

document.querySelector("#location-btn").addEventListener("click", () => {
  getWeather().then((data) => {
    console.log(data);
    updateDOM(data);
  });
});

async function getWeather() {
  const API_KEY = "8bee596d3044034ff720012076efd8f7";
  let search = locationInput.value;
  let units = "metric";
  let url = `http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&q=${search}&units=${units}`;
  let response = await fetch(url, { mode: "cors" });
  let data = await response.json();
  return data;
}

function updateDOM(data) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.textContent = `Current: ${Math.round(data.main.temp)}\xB0`;
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.textContent = `Max: ${Math.round(data.main.temp_max)}\xB0`;
  let minTemp = document.querySelector("#min-temp");
  minTemp.textContent = `Min: ${Math.round(data.main.temp_min)}\xB0`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.textContent = `${Math.round(data.wind.speed)} m/s`;
  let windDirection = document.querySelector("#wind-direction");
  windDirection.textContent = `${Math.round(data.wind.deg)}\xB0`;
  let directionImg = document.querySelector("#wind-arrow");
  directionImg.style.transform = `rotate(${data.wind.deg}deg)`;
  let city = document.querySelector("#city-header");
  city.textContent = data.name;
}
