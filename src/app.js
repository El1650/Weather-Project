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

  getForecast(response.data.coord);
}

//Using Geolocation API to get the GPS coordinates and display the current city and temp
let curr = document.querySelector("#current");
curr.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPos);
});

function searchPos(position) {
  apiKey = "5f465a71fc837e1674165a8ed3b775f1";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
searchCity("Addis Ababa");

//forecast Section
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function forecastTemp(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElt = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index > 0 && index < 7) {
      forecastHTML += `
      <div class="col-2">
      <div class="weekDate">${formatDay(forecastDay.time)}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        width="45" />
      <div class="weekTemp">
       <span class="weakTempMax">${Math.round(
         forecastDay.temperature.maximum
       )}°</span>&nbsp;
        <span class="weakTempMin">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElt.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  apiKey = "b4d8b9ad60f6t00838ba39200o473c14";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiUrl).then(forecastTemp);
}
