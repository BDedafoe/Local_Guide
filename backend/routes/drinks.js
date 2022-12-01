const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Drink = require('../models/Drink')


router.get('/', (req, res) => 
    Drink.findAll()
        .then(drinks => {
            console.log(drinks)
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));

module.exports = router;