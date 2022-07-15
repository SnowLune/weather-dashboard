// Coding Bootcamp Module 6 Challenge
// Weather Dashboard, Luna Roberge

const main = function()
{
   // Form for search
   var searchEl = document.getElementById("search");
   var searchInputEl = document.querySelector("#search input");

   var recentSearchesEl = document.getElementById("recents");
   var recentsListEl = document.getElementById("recentsList");

   const baseRequestUrl = "https://api.openweathermap.org/data/2.8/onecall" + 
      `?lat={lat}&lon={lon}&appid=${key.api}`;
   const baseGeoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct" + 
      `?q={q}&limit=1&appid=${key.api}`;
   
   // Holds 3 recent searches
   var recentSearches = [];

   // Fetch latitude and longitude from OpenWeatherMap Geocoding API
   async function fetchCoordinates(location) 
   {
      if (!location) 
      {
         console.error("No location provided.");
      }

      else
      {
         requestUrl = baseGeoCodeUrl.replace("{q}", `"${location}"`);

         try 
         {
            const response = await fetch(requestUrl,
               {
                  method: "GET",
                  mode: "cors",
                  credentials: "same-origin"
               }
            );

            const locationData = await response.json();
            return locationData;
         }
         
         catch (err)
         {
            console.error(err);
         }
      }
   }

   // Fetch weather from OpenWeatherMap One Call API
   async function fetchWeather(lat, lon)
   {
      if (!lat || !lon)
         return false
      else
      {
         requestUrl = baseRequestUrl.replace("{lat}", lat);
         requestUrl = requestUrl.replace("{lon}", lon);

         try {
            const response = await fetch(requestUrl,
               {
                  method: "GET",
                  mode: "cors",
                  credentials: "same-origin"
               }
            );

            const weatherData = await response.json();
            return weatherData;
         }
         catch (err)
         {
            console.error(err);
         }
      }
   }

   // Save Recent Search
   function saveSearch(searchText)
   {
      if ( recentSearchesEl.style.display == false )
      {
         recentSearchesEl.style.display = "block";
      }

      recentSearches.push(searchText);
      
      var mostRecentListEl = document.createElement("li");
      recentSearchesEl.appendChild(mostRecentListEl);

      var mostRecentSearchEl = document.createElement("a");
      mostRecentListEl.appendChild(mostRecentSearchEl);

      mostRecentSearchEl.textContent = searchText;
      mostRecentSearchEl.setAttribute("href", "#");
      mostRecentSearchEl.addEventListener("click",
         (event) => 
         {
            searchInputEl.value = searchText;
            search( searchInputEl.value ); 
         }
      )
   }

   // Create Weather UI Elements
   function createForecastUi( owmData )
   {
      // Main content div
      // remove old content first
      let existingContent = document.getElementById("main-content");
      if ( existingContent )
      {
         existingContent.remove();
      }
      var mainContent_el = document.createElement("div");
      document.querySelector("body").appendChild(mainContent_el);
      mainContent_el.setAttribute("id", "main-content");

      // current main div
      var currentMain_el = document.createElement("div");
      mainContent_el.appendChild(currentMain_el);
      // weather main div
      var weatherMain_el = document.createElement("div");
      currentMain_el.appendChild(weatherMain_el);

      // main image
      var mainImage_el = document.createElement("img");
      weatherMain_el.appendChild(mainImage_el);
      let iconId = owmData.current.weather[0].icon;
      mainImage_el.setAttribute("src", 
         `http://openweathermap.org/img/wn/${iconId}@2x.png`);
     
      let mainCondition = owmData.current.weather[0].main;
      mainImage_el.setAttribute("alt", mainCondition)

      // main text
      var mainText_el = document.createElement("div");
      weatherMain_el.appendChild(mainText_el);
      mainText_el.textContent = mainCondition;

      // current temp
      var currentTemp_el = document.createElement("h2");
      currentMain_el.appendChild(currentTemp_el);

      let currentTemp = Math.floor(owmData.current.temp - 273.15) 
            + "°C";
      currentTemp_el.textContent = currentTemp;

      // current additional
      var currentAdditional_el = document.createElement("ul");
      mainContent_el.appendChild(currentAdditional_el);

      // Wind
      var wind_el = document.createElement("li");
      currentAdditional_el.appendChild(wind_el);
      wind_el.textContent = `Wind Speed: ${owmData.current.wind_speed} m/s`;
      // Humidity
      var humidity_el = document.createElement("li");
      currentAdditional_el.appendChild(humidity_el);
      humidity_el.textContent = `Humidity: ${owmData.current.humidity}%`
      // UV Index
      var uvIndex_el = document.createElement("li");
      currentAdditional_el.appendChild(uvIndex_el);
      let currentUvIndex = owmData.current.uvi;
      let currentUvIndexName;
      let currentUvIndexColor;
      if ( currentUvIndex < 3 )
      {
         currentUvIndexName = "Low";
      }
      else if ( currentUvIndex < 6 )
      {
         currentUvIndexName = "Moderate";
      }
      else if ( currentUvIndex < 8 )
      {
         currentUvIndexName = "High";
      }
      else if ( currentUvIndex < 11 )
      {
         currentUvIndexName = "Very High";
      }
      else
      {
         currentUvIndexName = "Extreme";
      }

      uvIndex_el.innerHTML = `UV Index: ${owmData.current.uvi} `
            + `(<strong id=${currentUvIndexName.trim()}>${currentUvIndexName}`
            + `</strong>)`

      // Future 5 days
      for ( let i = 1; i < 6; i++ )
      {
         var daily_el = document.createElement("article");
         mainContent_el.appendChild(daily_el);
         var dailyDate_el = document.createElement("h3");
         daily_el.appendChild(dailyDate_el);
         let date = new Date(owmData.daily[i].dt * 1000)
         dailyDate_el.textContent = date.toDateString();

         // weather
         var dailyMain_el = document.createElement("ul");
         daily_el.appendChild(dailyMain_el);
         var dailyMainCondition_el = document.createElement("li");
         dailyMain_el.appendChild(dailyMainCondition_el);
         var dailyMainIcon_el = document.createElement("img");
         dailyMainCondition_el.appendChild(dailyMainIcon_el);
         dailyMainIcon_el.setAttribute("src", 
            `https://openweathermap.org/img/` 
                  + `wn/${owmData.daily[i].weather[0].icon}.png`
         );
         var dailyMainDesc_el = document.createElement("span");
         dailyMainCondition_el.appendChild(dailyMainDesc_el);
         dailyMainDesc_el.textContent = owmData.daily[i].weather[0].main;

      }
   }

   // Run Search
   function search( searchText )
   {
      let locationObj = fetchCoordinates(searchInputEl.value);
      locationObj.then( (locationData) => 
         {
            console.log(locationData[0]);

            let weatherObj = fetchWeather(locationData[0].lat, 
                     locationData[0].lon);
            weatherObj.then( (weatherData) =>
               {
                  console.log( weatherData );
                  createForecastUi( weatherData );
               }
            );
         }
      );
   }

   searchEl.addEventListener('submit', 
      (e)=>
      {
         e.preventDefault();
         saveSearch(searchInputEl.value);
         
         // search for weather
         search(searchInputEl.value);
      }
   )

   return true;
}

main();

