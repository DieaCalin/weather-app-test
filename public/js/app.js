console.log("Clinet side js loaded");

const url = "http://api.weatherstack.com/current?access_key=4e4a842d40f73f5944fe24f3cd98e828&query="


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#weather-result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(search.value){
        fetch(url + search.value).then((response) => {
            response.json().then((data, error) => {
                if(data.error){
                    console.log(data.error);
                }
                else {
                    messageOne.textContent = data.current.temperature;
                    console.log(data.current.temperature)
                }
            })
            })
    }
})