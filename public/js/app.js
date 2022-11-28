console.log("Clinet side js loaded");

const url = "/weather?location="


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#weather-result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(search.value){
        fetch(url + search.value).then((response) => {
            response.json().then((data, error) => {
                console.log(data)
                if(data.error){
                    console.log(data.error);
                }
                else {
                    messageOne.textContent = data.temperature + " celsius degrees in " + search.value;
                    console.log(data.temperature)
                }
            })
            })
    }
})