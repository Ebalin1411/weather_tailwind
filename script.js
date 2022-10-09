let weather_app={
    cityInput:'',
    arrInput:'',
    town_name:'',
    state_name:'',
    kToCelsTemp:'',
    kToFahrTemp:'',
    cityTemp:'',
    
    places:[ {
        city:"Bangalore",
        state:"Karnataka"        
        },
        {
        city:"Chennai",
        state:"Tamil Nadu"       
        },
        {
        city:"Hyderabad",
        state:"Telangana"       
        },
        {
        city:"kochi",
        state:"Kerala"
       
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

            if (hour===0 && prepand==='AM') 
            { 
                if (minute===0)
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
        getweather_info: function(){
                    
            weather_app.getvalues();  
            //console.log(this.cityInput)
            if(!this.cityInput){
                alert('Please Enter City Name');
                return
                }
                
                weatherUrl =new URL(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput}&`)                
                weatherUrl.searchParams.set("appid","d3835c83bcca0d1188350ce17234e7cf"); //setting key into the URl
                weatherUrl.searchParams.set("units","metric") // temp formate kelvin to Fa
                console.log(weatherUrl.toString()) 


                fetch(weatherUrl).then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                    alert('Location Not Found');
                  })
                  .then((data) => {
                    this.cityTemp = data.main.temp
                    document.getElementById('weather_status').innerHTML=data.weather[0].main;
                    document.getElementById('wind').innerHTML=data.wind.speed;                    
                    document.getElementById('humid').innerHTML = data.main.humidity;                  
                    document.getElementById('temp').innerHTML = this.cityTemp;
                    
                  })
                 
                  .catch((error) => {
                    console.log(error)
                  });               
               
                    weather_app.showChart();
                },

       showChart :  function(){

            
                chartdataUrl =new URL(`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityInput}&`)                
                chartdataUrl.searchParams.set("appid","d3835c83bcca0d1188350ce17234e7cf"); //setting key into the URl                              
                chartdataUrl.searchParams.set("units","metric")
                console.log(chartdataUrl.toString())  
                
                
                fetch(chartdataUrl).then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                    alert('Chart Record Not Found. Incorrect Location');
                  })
                  .then((data) => {
                    // date for chart x axis
                    // console.log(data.list[0].dt)
                    // console.log(new Date((data.list[0].dt_txt)).toLocaleDateString());
                    // console.log(new Date((data.list[0].dt_txt)).toDateString());
                    // console.log(data.list[1].dt_txt)
                    const day = data.list.map(  
                        function(index){
                            return new Date(index.dt_txt).toDateString();
                        })
                        console.log(day) 

                    const date = data.list.map(             
                        function(index){
                            return new Date(index.dt_txt).toLocaleTimeString();
                        })
                    console.log(date)
                    //Temperature for Y axis
                    // console.log(data.list[0].main.temp)
                    // console.log(data.list[1].main.temp)
                   
                   const chart_temp =data.list.map(
                        function(index){
                            return index.main.temp
                        })
                    console.log(chart_temp)

                    const chart_data = {
                        //  labels: 
                          datasets: [{
                          label: this.cityInput + ' Temperature',
                          backgroundColor: 'rgb(255, 99, 132)',
                          borderColor: 'rgb(255, 99, 132)',
                         // data: [60, 62, 59, 60, 61, 61, 60],   //need to to fetch from open weather
          
                          }]
                        };
                  
                      const config = {
                                          type: 'line',
                                          data: chart_data,
                                          options: {},
                                      }       
                          
          
                                       const myChart = new Chart(
                                           document.getElementById('myChart'),
                                           config
                                        );
                          
                 
                        
                  
                   myChart.config.data.labels =date;
                   myChart.config.data.labels =day;
                   myChart.config.data.datasets[0].data =chart_temp;                   
                   myChart.update();
                   
                    

                  })
                  .catch((error) => {
                    console.log(error)
                  });
            
        },

    }
    weather_app.getDateTime();
    
      
       






