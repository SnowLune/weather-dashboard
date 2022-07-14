// Coding Bootcamp Module 6 Challenge
// Weather Dashboard, Luna Roberge

const main = function()
{
   // Form for search
   var searchEl = document.getElementById("search");
   var searchInputEl = document.querySelector("#search input");

   var recentSearchesEl = document.getElementById("recents");

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
         requestUrl = baseGeoCodeUrl.replace("{q}", location);

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
      if (  )
   }

   searchEl.addEventListener('submit', 
      (e)=>
      {
         e.preventDefault();
         let locationObj = fetchCoordinates(searchInputEl.value);
         locationObj.then( (locationData) => 
            {
               console.log(locationData[0]);

               let weatherObj = fetchWeather(locationData[0].lat, 
                        locationData[0].lon);
               weatherObj.then( (weatherData) =>
                  {
                     console.log( weatherData );
                  }
               );
            }
         );
      }
   )

}

main();

