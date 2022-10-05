//http://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid={API key}
//chennai 
//13.0827° N, 80.2707° E-->lon
//d3835c83bcca0d1188350ce17234e7cf
// https://www.latlong.net/   ---->latitude and lon

//weather api without key
//https://fcc-weather-api.glitch.me/api/current?lat=13.0827&lon=80.2707

let lat = "";
let lon = ""; 
let url_api = "";        
let places=[
    {
        city:"Bangalore",
        latitude:12.971599,
        longitude:77.594566
    },
    {
        city:"Chennai",
        latitude:13.082680,
        longitude:80.270721
    },
    {
        city:"Hyderabad",
        latitude:17.385044,
        longitude:78.486671
    },
    {
        city:"Kerala",
        latitude:10.850516,
        longitude:76.271080
    },
    {
        city:"Delhi",
        latitude:28.613939,
        longitude:77.209023
    }
    
    ]
    
    function getvalues(){ 
        
        for(let i=0; i<places.length; i++){

           let cityInput = document.getElementById('place_input').value.toLowerCase();
           let arrInput  = places[i].city.toLowerCase();
           
           // console.log("text box input :" + cityInput);
           // console.log("array input    :" + arrInput);
           // console.log(arrInput.localeCompare(cityInput));
           
            if(arrInput.localeCompare(cityInput) === 0) {
                lat=places[i].latitude;
                lon=places[i].longitude; 
               
            }  
        }
        console.log(lat);
        console.log(lon);
        url_api="https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon 
        console.log(url_api);
    }
    getvalues();
    
