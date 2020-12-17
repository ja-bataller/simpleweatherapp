document.querySelector('#getAPI').addEventListener('submit', getAPI);


const apiKey = 'cefac420b87bab032731b9ca83b0f530';
const weatherHeader = document.querySelector('#weatherHeader')

function getAPI(e){
    e.preventDefault();
    const userInput = document.querySelector('#userInput').value;
    const imgWeather = document.querySelector('#imgWeather');
    const celcius = document.querySelector('#celcius');
    const description = document.querySelector('#description');
    const humidity = document.querySelector('#humidity');
    const pressure = document.querySelector('#pressure');
    const wind = document.querySelector('#wind');
    let weatherResult = document.querySelector('#weatherResult');
    const weatherModal = document.querySelector('#weatherModal');


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        // load data
        if(data != null)
            {
                data.weather.forEach(function(weather){
                    weatherHeader.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}`;
                    weatherResult.innerHTML = `
                    <div class="container modalBodyColor">
                        <div><img src="http://openweathermap.org/img/wn/${weather.icon}@4x.png"></div>
                        <div class="form-group weatherDetailsStyle pt-3" id="celcius">${data.main.temp} <span>&#8451;</span></div>
                        <div class="form-group weatherDetailsStyle">${weather.description}</div>
                        <div class="form-group weatherDetailsFont" id="humidity">HUMIDITY: ${data.main.humidity}%</div>
                        <div class="form-group weatherDetailsFont" id="pressure">PRESSURE: ${data.main.pressure} hPa</div>
                        <div class="form-group weatherDetailsFont" id="wind">WIND: ${data.wind.speed} m/s</div>
                    </div>
                `;
                    
                    document.querySelector('#userInput').value = "";
                    // console.log(data.name);
                });

                // show modal
                $('#weatherModal').modal('show'); 
            }

 
    })
    
    .catch(err => {
        console.log(err)
        // alert('City or Country Not Found!')
        iziToast.error({
            title: "Country or City not found",
            position: "topCenter",
            timeout: 3000,
        });
        document.querySelector('#userInput').value = "";
    })

}
