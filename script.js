
function fetchCountryData() {
    const restCountriesUrl = 'https://restcountries.com/v3.1/all';
  
    return fetch(restCountriesUrl)
      .then(response => response.json())
      .then(data => data);
  }
  
  
  function fetchWeatherData(city) {
    const apiKey = 'https://openweathermap.org/';
    const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    return fetch(openWeatherMapUrl)
      .then(response => response.json())
      .then(data => data.weather[0]);
  }
  
  
  function createCountryCard(countryData) {
    const card = document.createElement('div');
    card.className = 'card col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  
    const countryName = document.createElement('h1');
    countryName.id = 'title';
    countryName.className = 'text-center';
    countryName.textContent = countryData.name.common;
  
    const flag = document.createElement('img');
    flag.className = 'card-img-top';
    flag.src = countryData.flags.svg;
    flag.alt = `${countryData.name.common} flag`;
  
    const region = document.createElement('p');
    region.className = 'card-text';
    region.textContent = `Region: ${countryData.region}`;
  
    const capital = document.createElement('p');
    capital.className = 'card-text';
    capital.textContent = `Capital: ${countryData.capital[0]}`;
  
    const latlng = document.createElement('p');
    latlng.className = 'card-text';
    latlng.textContent = `Latlng: ${countryData.latlng.join(', ')}`;
  
    const countryCode = document.createElement('p');
    countryCode.className = 'card-text';
    countryCode.textContent = `Country Code: ${countryData.cca2}`;
  
    const weatherButton = document.createElement('button');
    weatherButton.className = 'btn btn-primary';
    weatherButton.textContent = 'check on weather';
    weatherButton.addEventListener('click', () => {
      const weatherUrl = `https://openweathermap.org/weather?lat=${countryData.latlng[0]}&lon=${countryData.latlng[1]}`;
      window.open(weatherUrl, '_blank');
    });
  
    cardBody.appendChild(countryName);
    card.appendChild(flag);
    cardBody.appendChild(region);
    cardBody.appendChild(capital);
    cardBody.appendChild(latlng);
    cardBody.appendChild(countryCode);
    cardBody.appendChild(weatherButton);
    card.appendChild(cardBody);
  
    return card;
  }
  
  
  function displayCountryCards(countryData) {
    const countryCards = document.getElementById('countryCards');
  
    countryData.forEach(country => {
      const countryCard = createCountryCard(country);
      countryCards.appendChild(countryCard);
    });
  }
  
  
  fetchCountryData()
    .then(countryData => {
      displayCountryCards(countryData);
  
      const cities = countryData.map(country => country.capital[0]);
  
      
      return Promise.all(cities.map(city => fetchWeatherData(city)));
    })
    .then(weatherData => {
      
      const countryCards = document.getElementsByClassName('card');
  
      for (let i = 0; i < weatherData.length; i++) {
        const weatherDescription = weatherData[i].description;
        const weatherInfo = document.createElement('p');
        weatherInfo.className = 'card-text';
        weatherInfo.textContent = `Weather: ${weatherDescription}`;
  
        countryCards[i].getElementsByClassName('card-body')[0].appendChild(weatherInfo);
      }
    })
    .catch(error => console.log('Error:', error));
  