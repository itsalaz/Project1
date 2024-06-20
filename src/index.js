
// config.js
import API_KEY from './config.js'

const searchButton = document.querySelector('#searchButton')
const citySearch = document.querySelector('#city__search')

// Clear search history
searchButton.addEventListener('click', (e) => {
  e.preventDefault()
  const cityName = citySearch.value
  weatherData(cityName)
  citySearch.value = ''
})

// Changes text color in search bar display when active 
citySearch.addEventListener('input', function() {
  citySearch.style.color = 'white'
  })

// Click button will be triggered when hitting enter
citySearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    searchButton.click()
  }
})




// Calls display of default city weather from (ex: weatherData which links from currentWeather)
document.addEventListener('DOMContentLoaded', () => {
  const defaultCity = 'New York'
  weatherData(defaultCity) // can link to default city because that is set to a city value 
})


// Collects both current weather and forecast data -- this step assists us to distinguish default and cityname input 
function weatherData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
       currentWeather(data)
    })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data)
    })
}


// Defines and sets weather attributes that get called by weatherData
function currentWeather(data) {
  document.querySelector('.city__name').textContent = data.name
  document.querySelector('.weather__temperature').textContent = `${Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F`
  document.querySelector('.min').textContent = `${Math.round((data.main.temp_min - 273.15) * 9/5 + 32)}°F`
  document.querySelector('.max').textContent = `${Math.round((data.main.temp_max - 273.15) * 9/5 + 32)}°F`
  document.querySelector('.weather__content').textContent = data.weather[0].main

  document.querySelector('.humidity__details').textContent = data.main.humidity + '%'
  document.querySelector('.wind__details').textContent = data.wind.speed + "mph"
  document.querySelector('.visibility__details').textContent = data.visibility + '%'


  const weatherIcon = document.querySelector('.weather__icon')
  weatherIcon.src = data.weather[0].main
  if (data.weather[0].main === 'Thunderstorm') {
  return weatherIcon.src = './images/lightning.png'
  } else if (data.weather[0].main === 'Drizzle') {
  return weatherIcon.src = './images/raining.png'
  } else if (data.weather[0].main === 'Rain') {
  return weatherIcon.src = './images/raining.png'
  } else if (data.weather[0].main === 'Snow') {
  return weatherIcon.src = './images/lightning.png'
  } else if (data.weather[0].main === 'Atmosphere') {
  return weatherIcon.src = './images/sunny__cloudy__weather.png'
  } else if (data.weather[0].main === 'Clear') {
  return weatherIcon.src = './images/sunny__weather__icon.png'
  } else if (data.weather[0].main === 'Clouds') {
  return weatherIcon.src = './images/sunny__cloudy__weather.png'
  } 
}

// Defines Forecast for Display
function displayForecast(data) {
  const dayTemp = document.querySelectorAll('.day_temp')
  for (let i = 0; i < dayTemp.length; i++) {
    dayTemp[i].textContent = `${Math.round((data.list[i * 8].main.temp - 273.15) * 9/5 + 32)}°F` // converting weather from Kelvin to Farenheit, i*8 because updates every 3 hours (8 times daily) 
    }
  }
