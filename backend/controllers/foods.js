const express = require('express');
const router = express.Router();
const db = require('../models');
const { Food } = db

// Get food list
router.get('/', (req, res) => 
    Food.findAll()
        .then(foods => {
            console.log(foods)
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));

// Add a food
router.get('/add', (req, res) => {
    const data = {
        place: 'Smashville BBQ',
        city: 'Clarksville',
        state: 'Tennessee',
        cuisine: 'cheese curds and brisket'
    }


 let { place, city, state, cuisine } = data;

 // instert into table
  Food.create({
    place,
    city,
    state,
    cuisine
  })
    .then(Food => res.redirect('/foods'))
    .catch(err => console.log(err));

});

module.exports = router;