//change city name
let form = document.querySelector(".input-city");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let h2 = document.querySelector("h2");
  if (city.value) {
    h2.innerHTML = `${city.value}`;
  }
});

//change date and time
let dayTime = document.querySelector("#date-time");
let now = new Date();
let hr = now.getHours();
let min = now.getMinutes();
let d = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dt = d[now.getDay()];
dayTime.innerHTML = `${dt} ${hr}:${min}`;

//integrating the API to change the temp

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let c = document.querySelector("#city").value;
  let apiKey = "01efd6f69c452a0343e0f052f247c28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${c}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
});

function showTemp(response) {
  let f = document.querySelector("#deg-far");
  let c = document.querySelector("#deg-cel");
  document.querySelector("#hum").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#temp-deg").innerHTML = Math.round(
    response.data.main.temp
  );
  let cel = Math.round(response.data.main.temp);
  let far = Math.round((cel * 9) / 5 + 32);

  f.addEventListener("click", function () {
    document.querySelector("#temp-deg").innerHTML = `${far}`;
  });

  c.addEventListener("click", function () {
    document.querySelector("#temp-deg").innerHTML = `${cel}`;
  });
}

let curr = document.querySelector("#current");
curr.addEventListener("submit", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPos);
});

function searchPos(position) {
  let apiKeyy = "01efd6f69c452a0343e0f052f247c28f";
  let apiUrll = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKeyy}&units=metric`;
  axios.get(apiUrll).then(showTemp);
}
