const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.status(200).render('home')
})

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    const dataBeers = beersFromApi
    res.status(200).render('beers',{dataBeers})
  })
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beersFromApi => {
    const dataRandom_Beer = beersFromApi
    res.status(200).render('random-beer',{dataRandom_Beer})
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'))
