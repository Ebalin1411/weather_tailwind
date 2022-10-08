let weather_app={
    cityInput:'',
    arrInput:'',
    town_name:'',
    state_name:'',
    
    places:[ {
        city:"Bangalore",
        state:"Karnataka",
        // latitude :"12.971599",
        // longitude :"77.594566"
        },
        {
        city:"Chennai",
        state:"Tamil Nadu",
        // latitude :"13.082680",
        // longitude :"80.270721"
        },
        {
        city:"Hyderabad",
        state:"Telangana",
        // latitude :"17.385044",
        // longitude :"78.486671"
        },
        {
        city:"kochi",
        state:"Kerala",
        // latitude :"9.931233",
        // longitude :"76.267303"
        }],


        // getting location 
        getvalues:function(){
             
            this.cityInput = document.getElementById('place_input').value;      
             
            for(let i=0; i< this.places.length; i++){

                if(this.places[i].city.toLowerCase().localeCompare(document.getElementById('place_input').value.toLowerCase()) ===0) {               
                    this.town_name=this.places[i].city;
                    this.state_name=this.places[i].state;
                    console.log(this.town_name + " "+ this.state_name)
                    document.getElementById('t_name').innerHTML =  this.town_name +",";
                    document.getElementById('s_name').innerHTML = this.state_name +".";
                                
                    }
                }
                               
            
        },

        getDateTime:function(){
                     
            weather_app.getvalues();  
            var today = new Date();
            var day = today.getDay();
            var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
         
            var hour = today.getHours();
            var minute = today.getMinutes();
 
            var prepand = (hour >= 12)? " PM ":" AM ";
            hour = (hour >= 12)? hour - 12: hour;
            if (hour===0 && prepand===' PM ') 
             { 
                if (minute===0)
                    { 
                        hour=12;
                        prepand=' Noon';
                    } 
                 else
                     { 
                        hour=12;
                        prepand=' PM';
                    } 
            } 

            if (hour===0 && prepand===' AM ') 
            { 
                if (minute===0 && second===0)
                     { 
                        hour=12;
                        prepand=' Midnight';
                    } 
                else
                    { 
                    hour=12;
                    prepand=' AM';
                    } 
            }
            //console.log(daylist[day] + ",  "+hour  + " : " + minute + prepand );
            document.getElementById('date_time').innerHTML =  daylist[day] + ",  "+hour  + " : " + minute + prepand      

        },





        //Fetch weather data from Openweather
        getweather_info: async function(){
                    
            weather_app.getDateTime();
            //console.log(this.cityInput)
            if(!this.cityInput){
                alert('Please Enter City Name');
                return
                }
                
                endpoint =new URL(`http://api.openweathermap.org/data/2.5/weather?q=${this.cityInput}&`)                
                endpoint.searchParams.set("appid","d3835c83bcca0d1188350ce17234e7cf"); //setting key into the URl
                console.log(endpoint.toString())                   
                let response = await fetch(endpoint);
                    
                    if(response.status === 404){
                        alert("City Name not Found");
                        return;
                    }  
                  
                    let data =await response.json();

                    
                    console.log(data.wind.speed);
                    console.log(data.main.temp);
                    console.log(data.main.humidity);                    
                    console.log(data.weather[0].main) ;
                    console.log(data);


                    document.getElementById('weather_status').innerHTML=data.weather[0].main;
                    document.getElementById('wind').innerHTML=data.wind.speed;                    
                    document.getElementById('humid').innerHTML = data.main.humidity;
                    document.getElementById('temp').innerHTML =data.main.temp;

                 
                },

       

                
            
        }
        
        
      
       






