let weather_app={
    cityInput:'',
    arrInput:'',
    town_name:'',
    state_name:'',
    
    places:[{city:"Bangalore", state:"Karnataka"},{city:"Chennai", state:"Tamil Nadu"},{city:"Hyderabad", state:"Telangana"},{city:"kochi", state:"Kerala"} ],


  
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

        getweather_info: async function(){
            weather_app.getvalues();
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

                    //....... Iterate over the Properties of an Object and its Children Objects
                    
                //     const isObject =function(val){
                //         if(val=== null){
                //             return false;
                //         }
                //         return(typeof val ==='object');
                //     };

                //     const  objProps =function(obj){

                //         for (let val in obj){
                //             if(isObject(obj[val])){
                //                 objProps(obj[val]);
                //             }else{
                                 
                //                     if (obj = 'humidity'){
                //                         console.log(val);
                //                     }


                                   
                //             }
                //         }; 
                //     };
                //     objProps(weather_arr)

                   

                },

                
        chartshow: async function(){

            chartdataUrl =new URL(`http://api.openweathermap.org/data/2.5/forecast?q=${this.cityInput}&`)                
            chartdataUrl.searchParams.set("appid","d3835c83bcca0d1188350ce17234e7cf"); //setting key into the URl
            console.log(chartdataUrl.toString())                   
            let response = await fetch(chartdataUrl);
                
                if(response.status === 404){
                    alert("Something wrong with the weather data fetch");
                    return;
                }  
              
            let data =await response.json();

             
            dates = data.list.map(list => {
                return list.dt_txt;
            });
    
            temps = data.list.map(list => {
                return list.main.temp;
            });
    
    
            var options = {
                series: [{
                    name: 'Temp',
                    data: temps,
                }],
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: true
                },
                stroke: {
                    curve: 'smooth'
                },
    
                xaxis: {
                    type: 'time',
                    // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z"],
                    categories: dates,
                    labels: {
                        // format: 'hh:mmTT',
                    },
                    time: {
                        parser: 'MM/DD HH:mm',
                        tooltipFormat: 'HH:mm',
                        unit: 'hour',
                        unitStepSize: 3,
                        displayFormats: {
                            'time': 'MM/DD HH:mm'
                        }
                    }
                },

         
            };
      
            var chart = new Chart(document.getElementById('myChart'), options);
            chart.destroy();
            chart.render();
        }
    }

        
            
        }
        
        
      
       






