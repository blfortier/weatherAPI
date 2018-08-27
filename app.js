/*global $*/
/* global navigator*/

$(document).ready(function () {
    var tempInF;
    // Get user location 
  navigator.geolocation.getCurrentPosition(success, error);

    // Use the HTML5 geolactor to get latitude and longitude coordinates. Assing those coordinated to variables that will be used in the weatherDetails function
    function success(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        weatherDetails(lat, long);
    }

    // To be dispalyed if the users coordiantes cannot be obtained
    function error() {
        console.log("error!");
    }

    // Call the fcc weather API
    function weatherDetails(lat, long) {
        var api = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        // Use the response from the API to send data to the updateDOM function
        $.getJSON(api, function(data) {
            updateDOM(data);
        });
    } 

   // The updateDOM function displays the info desired info from the API to the DOM nodes
  function updateDOM(data) {
    var city = data.name;
    var country = data.sys.country;
    var celsius = (data.main.temp).toFixed();
    var conditions = data.weather[0].description;
    var icon = data.weather[0].icon;
    
    // For switching between celsius and fahrenheit
    var swapTemp = true;

    // Convert the celsius temp to fharentheit
    var fahrenheit = ((celsius) * (9 / 5) + 32).toFixed();
    
    // Display the infor from the response to the user
    $("#location").html(city + ", " + country);
    $("#temp").html(fahrenheit + " &#8457;");
    $("#weatherDesc").html(conditions);
    $("#weatherIcon").attr('src', icon);
    
    // A function that switches the temperature between fahrenheit and celsius
    $("#switch").click(function(){
      
      if(swapTemp === false){
        $("#temp").html(celsius + " &#8451;");
        swapTemp = true;
      }
      else {
        $("#temp").html(fahrenheit + " &#8457;");
        swapTemp = false;
      }
    });    
  }
  
 });
