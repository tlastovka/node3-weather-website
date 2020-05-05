const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const chalk = require('chalk')

// Define Paths for Express Configuration
const publicPathDirectory= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //changing name of the views directory (where handlebars files reside) to any other dicrectors
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs') //setting up Handlebars
app.set('views', viewsPath) //Changing name of the views directory (where handlebars files reside) to any other dicrectors
hbs.registerPartials(partialsPath)

//Setting up static directory to serve
app.use(express.static(publicPathDirectory))


//ROUTES:
// app.get('', (req, res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tomas',
    })
}) // This is a route to index.hbs of Handlebars template


app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tomas',
    })
}) // This is a route to about.hbs of Handlebars template


app.get('/help',(req,res) => {
    res.render('help', {
        message: 'Error 404',
        from: 'The System,',
        title: 'Help Page',
        name: 'Tomas'
    })
}) // This is a route to about.hbs of Handlebars template


app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the ADDRESSS URL parameter'
        })
    }

    geocode(req.query.address, (error, body) => {
        if (error){
          return res.send({
              error: error
          })
        }

        forecast(req.query.address, (error, { weatherDescription, temperature, feelslike, humidity } = {}) => {
            if (error) {
                return res.send({
                error: error
                })
            }

            res.send({
                address: req.query.address,
                location: body.location,
                forecast: weatherDescription,
                temperature: temperature,
                feelslike: feelslike,
                humidity: humidity

            })
        }
        )
    })

}) // This is a route whisch sends data in JSON to the browser

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide the SERACH parameter',
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 Page for /help/*',
        name: 'Tomas',
        errorMsg: 'Error: Help Page not Found',
    })
})  // This is a route to 404.hbs Handlebars template in case .../help/*

app.get('/*', (req, res)=>{
    res.render('404',{
        title: '404 Page for all pages after /',
        name: 'Tomas',
        errorMsg: 'Error: Page not Found',
    })
})  // This is a route to 404.hbs Handlebars template in case .../*




//STARTING THE SERVER:

app.listen(port, () => {
    console.log('Server is up on PORT ' + port)
})