const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db

// // Get user list
// router.get('/', (req, res) =>
//     User.findAll()
//         .then(users => {
//             console.log(users)
//             res.sendStatus(200);
//         })
//         .catch(err => console.log(err)));

// // Add a user
// router.get('/add', (req, res) => {
//     const data = {
//         first_name: 'Savannah',
//         last_name: 'Smokey',
//         email: 'Kitties@gmail.com',
//         password: 'Catreats42',
//     }


//  let { first_name, last_name, email, password } = data;

//  // instert into table
//   User.create({
//     first_name,
//     last_name,
//     email,
//     password,
//   })
//     .then(User => res.redirect('/users'))
//     .catch(err => console.log(err));

// });

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})


router.get('/', async (req, res) => { 
    const users = await User.findAll()
    res.json(users)
})

module.exports = router;