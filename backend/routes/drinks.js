const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Drink = require('../models/Drink')

// Get drink list
router.get('/', (req, res) => 
    Drink.findAll()
        .then(drinks => {
            console.log(drinks)
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));

// Add a drink
router.get('/add', (req, res) => {
    const data = {
        place: 'Hop Factory',
        city: 'Clarksville',
        state: 'Tennessee',
        drink_type: 'hoppy beer'
    }


 let { place, city, state, drink_type } = data;

 // instert into table
  Drink.create({
    place,
    city,
    state,
    drink_type
  })
    .then(Drink => res.redirect('/drinks'))
    .catch(err => console.log(err));

});

module.exports = router;