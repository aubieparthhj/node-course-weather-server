console.log('Client side javascript file is loaded!')

/* fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

/* fetch('http://localhost:3000/weather?address=').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
}) */

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('clicked')
    const location = document.querySelector('input').value
    console.log(location)
    messageOne.textContent = 'Loading...'   
    messageTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_descriptions + '. It is currently ' + data.forecast.temperature + ' degrees out. There is a ' + data.forecast.precip + '% chance of rain.'
            }
        })
    })
})