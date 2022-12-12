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
const defineCurrentUser = require('./middleware/defineCurrentUser')

// app.use(cors({
//     origin: 'http://localhost:3007',
//     credentials: true
// }));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(logger)
app.use(defineCurrentUser)
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))


// Root Route
app.get ('/', (req, res) =>
    res.send("Connected to the Backend!"));

app.use('/foods', require('./controllers/foods'));
app.use('/drinks', require('./controllers/drinks'));
// app.use('/user', require('./routes/userRoutes'));


app.use('/api/User', require('./routes/userRoutes'));

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'public', 'build')));
}

// Error Handling
app.use(errorHandler)

//Server
app.listen(process.env.PORT, console.log(`Server started on Port ${process.env.PORT}`));

