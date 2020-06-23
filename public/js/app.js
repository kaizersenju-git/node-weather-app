const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    const location = searchElement.value; 
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
            if(!data.error) {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.rainChance + 
                " Chance of Rain - " + "Weather Summary: " 
                + data.forecast.summary + " - Temperature is: " + data.forecast.temperature
                + " Degrees Celsius" ;
                messageThree.textContent = "Timezone: " + data.forecast.timezone + " Local Time: " + data.forecast.localTime;
            } else {    
               messageOne.textContent = "";
               messageTwo.textContent = data.error;
               messageThree.textContent = "";
            }
        })
    })
})