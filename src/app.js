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
function setTime(timestamp) {
  let now = new Date();
  let hr = now.getHours();
  if (hr < 10) {
    hr = `0${hr}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
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
  return `${dt} ${hr}:${min}`;
}

//integrating the API to change the temp
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let c = document.querySelector("#city").value;
  searchCity(c);
});

function searchCity(city) {
  let apiKey = "01efd6f69c452a0343e0f052f247c28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  forecastTemp();
  let f = document.querySelector("#deg-far");
  let c = document.querySelector("#deg-cel");
  let cel = Math.round(response.data.main.temp);
  document.querySelector("#date-time").innerHTML = setTime(response.data.dt);
  document.querySelector("h2").innerHTML = response.data.name;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
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

  f.addEventListener("click", function () {
    c.classList.remove("active");
    f.classList.add("active");
    let far = Math.round((cel * 9) / 5 + 32);
    document.querySelector("#temp-deg").innerHTML = `${far}`;
  });

  c.addEventListener("click", function () {
    f.classList.remove("active");
    c.classList.add("active");
    document.querySelector("#temp-deg").innerHTML = `${cel}`;
  });
}

//Using Geolocation API to get the GPS coordinates and display the current city and temp
let curr = document.querySelector("#current");
curr.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPos);
});

function searchPos(position) {
  let apiKeyy = "5f465a71fc837e1674165a8ed3b775f1";
  let apiUrll = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKeyy}&units=metric`;
  axios.get(`${apiUrll}&appid=${apiKeyy}`).then(showTemp);
}
searchCity("Addis Ababa");

//forecast Section
function forecastTemp() {
  let forecastElt = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur"];
  days.forEach(function (day) {
    forecastHTML += `
      <div class="col-2">
      <div class="weekDate">${day}</div>
      <img
        src="https://openweathermap.org/img/wn/50d@2x.png"
        alt=""
        width="45" />
      <div class="weekTemp">
        <span class="weakTempMax">18°</span>&nbsp;
        <span class="weakTempMin"> 12°</span>
      </div>
    </div>`;
  });
  forecastHTML += `</div>`;
  forecastElt.innerHTML = forecastHTML;
}
