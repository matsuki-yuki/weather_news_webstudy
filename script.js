const latInput = document.querySelector("#latInput");
const lonInput = document.querySelector("#lonInput");
const searchBtn = document.querySelector("#searchBtn");
const statusText = document.querySelector("#statusText");
const resultArea = document.querySelector("#resultArea");

const WEATHER_CODES = {
  0: "快晴", 1: "晴れ", 2: "一部曇り", 3: "曇り",
  61: "小雨", 63: "雨", 71: "雪", 95: "雷雨",
};

async function searchWeather() {
  const lat = latInput.value.trim();
  const lon = lonInput.value.trim();
  if (!lat || !lon) {
    statusText.textContent = "緯度と経度を入力してください";
    return;
  }

  statusText.textContent = "検索中...";
  resultArea.innerHTML = "";
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const data = await response.json();
  const current = data.current_weather;

  const tempText = document.createElement("p");
  tempText.className = "temperature";
  tempText.textContent = `${current.temperature}°C`;

  const conditionText = document.createElement("p");
  conditionText.className = "condition";
  conditionText.textContent = WEATHER_CODES[current.weathercode] || "不明な天気";

  resultArea.appendChild(tempText);
  resultArea.appendChild(conditionText);
  statusText.textContent = "";
}

searchBtn.addEventListener("click", searchWeather);