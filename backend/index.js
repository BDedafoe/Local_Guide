require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./config/database');

// Database Test
db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err))

app.get ('/', (req, res) =>
    res.send('Testing! Testing!'));

app.listen(process.env.PORT, console.log(`Server started on ${process.env.PORT}`));