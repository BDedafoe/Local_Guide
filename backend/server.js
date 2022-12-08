require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const defineCurrentUser = require('./middleware/defineCurrentUser')

app.use(cors({
    origin: 'http://localhost:3007',
    credentials: true
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(defineCurrentUser)

// Database Test
// db.authenticate()
//     .then(() => console.log('Database Connected!'))
//     .catch(err => console.log('Error: ' + err));
app.use(express.urlencoded({ extended: true }));
//Root Route
app.get ('/', (req, res) =>
    res.send("Connected to the Backend!"));

//Database Routes
app.use('/drinks', require('./controllers/drinks'));
app.use('/users', require('./controllers/users'));
app.use('/foods', require('./controllers/foods'));

//Server
app.listen(process.env.PORT, console.log(`Server started on Port ${process.env.PORT}`));