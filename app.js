const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.status(200).render('home')
})

app.get('/beers', (req, res) => {
  const punkAPI = new PunkAPIWrapper()
  punkAPI
  .getBeers()
  .then(beersFromApi => res.status(200).json(beersFromApi))
  .catch(error => console.log(error));
})


app.get('/random-beer', (req, res) => {
  res.status(200).render('random-beer')
})

app.listen(3000, () => console.log('🏃‍ on port 3000'))
