//variables to return gps coords.
var lattitude2="-43.525650",
    longitude2="172.639847",
    //http for weather map api loaded into variable
    openweapi = 
    'http://api.openweathermap.org/data/2.5/weather?lat='+lattitude2+'&lon='+longitude2+'&appid=1a7002ce4f09d21794aebec0cd1aa58d',
    places;
   
    $.getJSON(openweapi,function(data){
        
                var city = data.name,
                    description = data.weather[0].description,
                    temperature =  data.main.temp,
                    windspeed =  data.wind.speed;
        
                document.getElementById("weatherinfo2").innerHTML =
                "City name =          " + city +
                "<br/>Description =   " + description + 
                "<br/>Temperature =   " + temperature +
                "<br/>Windspeed =      " + windspeed
            });        

//initiate google.map api2
$(document).ready(function initAutocomplete2(longitude2,lattitude2) {

    var map2 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: -43.525650, lng: 172.639847},
    zoom: 12,
    mapTypeId: 'satellite'
    });

    //get user input data
    var input2 = document.getElementById('pac-input2');

    var searchBox2 = new google.maps.places.SearchBox(input2);

    // Bias the SearchBox results towards current map's viewport.
    map2.addListener('bounds_changed', function() {
    searchBox2.setBounds(map2.getBounds());
    });

    var markers2 = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox2.addListener('places_changed', function() {
    places = searchBox2.getPlaces();
    if (places.length == 0) {
        return;
      }  

    // Clear out the old markers.
    markers2.forEach(function(markers2) {
    markers2.setMap(null);
    });
        markers2 = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(places) {
        if (!places.geometry) {
        console.log("Returned place contains no geometry");
            return;
        }

    var icon = {
    url: places.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers2.push(new google.maps.Marker({
        map: map2,
        icon: icon,
        title: places.name,
        position: places.geometry.location
    }));

    //taking gps coords from google places api
    lattitude2 = places.geometry.location.lat(),
    longitude2 = places.geometry.location.lng();
    openweapi = 
    'http://api.openweathermap.org/data/2.5/weather?lat='+lattitude2+'&lon='+longitude2+'&appid=1a7002ce4f09d21794aebec0cd1aa58d',
    places;

    // pop up alert to display lattitude / longitude coords
    window.alert('latttitude:  ' + lattitude2 + '    longitude:  ' + longitude2);
    
    //retrieving data from weather app and displaying
    $.getJSON(openweapi,function(data){

        var city = data.name,
            description = data.weather[0].description,
            temperature =  data.main.temp,
            windspeed =  data.wind.speed;

        document.getElementById("weatherinfo2").innerHTML =
        "City name =          " + city +
        "<br/>Description =   " + description + 
        "<br/>Temperature =   " + temperature +
        "<br/>Windspeed =      " + windspeed
    });

    if (places.geometry.viewport) {
    // Only geocodes have viewport.
        bounds.union(places.geometry.viewport);
    } else {
        bounds.extend(places.geometry.location);
    }
    
    return lattitude,longitude;
    });

    map2.fitBounds(bounds);
    });
});

