//require package used in the project
const express = require('express')
const app = express()
const port = 4000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))


//routes setting
// create a variable to store restaurant
  app.get('/', (req, res) => {  
  // pass the restaurant data into 'index' partial template
  res.render('index',{restaurant: restaurantList.results});
})

app.get('/search', (req, res) => {  
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant =>{
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  // pass the restaurant data into 'index' partial template
  res.render('index',{restaurant: restaurants, keyword: keyword});
})


//pass the restaurant data for show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find( restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show',{restaurant: restaurant})
})

//start and listen on the Express server
app.listen(port, () =>{
  console.log(`Express is listening on localhost:${port}`)
})