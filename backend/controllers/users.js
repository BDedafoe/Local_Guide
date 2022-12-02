const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User')

// Get user list
router.get('/', (req, res) => 
    User.findAll()
        .then(users => {
            console.log(users)
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));

// Add a user
router.get('/add', (req, res) => {
    const data = {
        first_name: 'Savannah',
        last_name: 'Smokey',
        email: 'Kitties@gmail.com',
        password: 'Catreats42',
    }


 let { first_name, last_name, email, password } = data;

 // instert into table
  User.create({
    first_name,
    last_name,
    email,
    password,
  })
    .then(User => res.redirect('/users'))
    .catch(err => console.log(err));

});

module.exports = router;