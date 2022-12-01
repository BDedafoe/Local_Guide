require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const app = express();
const db = require('./config/database'); //pgAdmin database
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// Database Test
db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err))



//Routes
app.get ('/', (req, res) =>
    res.render('home'));

app.use('/drinks', require('./routes/drinks'));

app.listen(process.env.PORT, console.log(`Server started on ${process.env.PORT}`));