const express = require('express')
const app = express()

const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

//app.com

//app.com/help
//app.com/about
//app.com/weather

//request and response are the parameters of the callback function
//req is the request object
//res is the response object
//req.query is the query string
//req.params is the path parameters
//req.body is the body of the request

console.log(__dirname)
console.log(__filename)

const path = require('path')
const cors = require('cors'); 

//setup static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))
// Allow requests from a specific origin
app.use(cors({ origin: 'http://127.0.0.1:3000' }));

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Parth Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Parth Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helperText: 'This is the help page',
        name: 'Parth Jain'
    })
})

// Custom 404 page for unmatched help articles
app.get('/help/:article', (req, res) => {
    res.status(404).render('404', {
        title: 'Help 404',
        errorMessage: 'Sorry, the help article you are looking for does not exist.',
        name: 'Parth Jain'
    });
});


app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

///this is the new syntax for 404 page
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Parth Jain'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})