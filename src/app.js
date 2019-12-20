const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
// Difine paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory serve
app.use(express.static(publicDirPath))
/*
app.get('', (req, res) => {
    res.send([{
        name: 'Luis',
        age: 21
    }, {
        name: 'Sarah'
    }])
})
*/
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help me',
        title: 'Help',
        name: 'Luis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Luis'
    })
})


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luis'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
    
                } return res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })

            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help articule not found',
        title: '404',
        name: 'Luis'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Luis'
    })
})
// app.com

app.listen(port, () => {
    console.log('Server running on port ' + port)
})