console.log('Client Side JS Loaded!');


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading....';
    messageTwo.textContent= '';
    const location = searchElement.value; 
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
            if(!data.error) {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.rainChance + " Chance of Rain - " + "Weather Summary: "+ data.forecast.summary + " - Temperature is: " + data.forecast.temperature + " Degrees Celsius" 
            } else {
               messageOne.textContent = ""
               messageTwo.textContent = data.error
            }
        })
    })
})