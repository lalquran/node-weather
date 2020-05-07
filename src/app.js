const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weather')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const public = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partials)

// Setup static directory to serve
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Laith Alquran'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Laith Alquran'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Laith Alquran'
    })
})

app.get('/weather', weather.getForecast)

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Laith Alquran',
        message: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Laith Alquran',
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log("Application started on port: ", port)
})