// Coding Bootcamp Module 6 Challenge
// Weather Dashboard, Luna Roberge

const main = function()
{
   // Form for search
   var searchEl = document.getElementById("search");
   var searchInputEl = document.querySelector("#search input");

   const baseRequestUrl = "https://api.openweathermap.org/data/3.0/onecall" + 
      `?lat={lat}&lon={lon}&appid=${key.api}`;
   const baseGeoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct" + 
      `?q={q}&limit=1&appid=${key.api}`;

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

   searchEl.addEventListener("submit", 
      (e)=>
      {
         e.preventDefault();
         console.log(searchInputEl.value.split(","))
      }
   )

}

main();

