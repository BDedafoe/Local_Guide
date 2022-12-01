require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.get ('/', (req, res) =>
    res.send('Testing! Testing! Testing!'));

app.listen(process.env.PORT, console.log(`Server started on ${process.env.PORT}`));