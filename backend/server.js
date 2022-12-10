require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const db = require('./config/config');  //PGAdmin database
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin: 'http://localhost:3007',
    credentials: true
}));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(logger)

// app.use(cors(corsOptions))

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))


// //Root Route
app.get ('/', (req, res) =>
    res.send("Connected to the Backend!"));

app.use('/foods', require('./controllers/foods'));
app.use('/drinks', require('./controllers/drinks'));
app.use('/user', require('./routes/userRoutes'));
// app.use('/authController', require('./controllers/authController'));

app.use('/api/user', require('./routes/userRoutes'));


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)



// //Database Routes
// app.use('/drinks', require('./controllers/drinks'));

// app.use('/foods', require('./controllers/foods'));

// app.use('/user', require('./routes/userRoutes'));



//Server
app.listen(process.env.PORT, console.log(`Server started on Port ${process.env.PORT}`));

