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
  // const restaurantEight ={
  //     "id": 8,
  //     "name": "布娜飛比利時啤酒餐廳",
  //     "name_en": "Bravo Beer",
  //     "category": "義式餐廳",
  //     "image": "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5634/08.jpg",
  //     "location": "台北市松山區市民大道四段 185 號",
  //     "phone": "02 2570 1255",
  //     "google_map": "https://goo.gl/maps/V9mKwVJ4s5v",
  //     "rating": 4.7,
  //     "description": "我們希望帶給您的，不只是啤酒，有美食，還有一份對生活的熱情。 義大利語「Bravo」的原意─「喝采」、「讚揚」， 我想著如果有一個大家都能輕鬆品嚐美酒、享受美食的地方，那就真的是太棒了！ 因為這個念頭，加上一股對比利時啤酒的熱情， 於是「Bravo Beer布娜飛比利時啤酒餐廳」在2006年誕生了..."
  //   }
    res.render('show',{restaurant: restaurant})
})

//start and listen on the Express server
app.listen(port, () =>{
  console.log(`Express is listening on localhost:${port}`)
})