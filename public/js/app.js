



// Selectors

 const weatherForm = document.querySelector('form') // Seect the form input in Index.hbs
 const search = document.querySelector('input') //selecting the sear field of the imput form in Index.hbs
 const messageOne = document.querySelector('#messageOne')
 const messageTwo = document.querySelector('#messageTwo')



 weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value  //Getting the content of the "addressForm" input
    const locationURL = "/weather?address=" + location

    messageOne.textContent = messageOne.textContent = "Loading..."
    messageTwo.textContent = ""


    fetch(locationURL).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = 'You server did not provide any data: ' + data.error
        } else {
            messageOne.textContent = 'Location is: ' + data.location
            messageTwo.textContent = 'Here is your forecast: The weather is ' + data.forecast + '. The temperature is: ' + data.temperature + '. It feels like: ' + data.feelslike + ', and the humidity is: ' +
data.humidity
        }
    })
    })

 })