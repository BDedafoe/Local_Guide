const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User')

// Get drink list
router.get('/', (req, res) => 
    User.findAll()
        .then(users => {
            console.log(users)
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));

// Add a drink
router.get('/add', (req, res) => {
    const data = {
        first_name: 'Henry',
        last_name: 'Ford',
        email: 'DetriotLions@gmail.com',
        password: '1245454',
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