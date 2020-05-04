console.log('This is a client side Java Script file')



// Selectors

 const weatherForm = document.querySelector('form') // Seect the form input in Index.hbs
 const search = document.querySelector('input') //selecting the sear field of the imput form in Index.hbs
 const messageOne = document.querySelector('#messageOne')
 const messageTwo = document.querySelector('#messageTwo')



 weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value  //Getting the content of the "addressForm" input
    const locationURL = "http://localhost:3000/weather?address=" + location

    messageOne.textContent = messageOne.textContent = "Loading..."
    messageTwo.textContent = ""


    fetch(locationURL).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = 'You server did not provide any data: ' + data.error
        } else {
            messageOne.textContent = 'Location is: ' + data.location
            messageTwo.textContent = 'Here is your forecast: ' + data.forecast
        }
    })
    })

 })