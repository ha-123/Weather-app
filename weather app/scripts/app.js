const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.detail');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const updateCard = (data) =>{
    const {city_det, weather} =data;
    details.innerHTML = `
      <h5 class="my-3">${city_det.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    `;
    const iconSrc =`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSrc = weather.IsDayTime? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
};

const updateCity = async (city)=>{
    const city_det = await getCity(city);
    const weather = await getWeather(city_det.Key);

    return {city_det, weather};
};
cityForm.addEventListener('submit', fun =>{
    fun.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
       .then(data => updateCard(data))
       .catch(err => console.log(err));
})