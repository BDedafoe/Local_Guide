// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const { Food } = db

// // Get food list
// router.get('/', (req, res) => 
//     Food.findAll()
//         .then(foods => {
//             console.log(foods)
//             res.sendStatus(200);
//         })
//         .catch(err => console.log(err)));

// // Add a food
// router.get('/add', (req, res) => {
//     const data = {
//         place: 'Smashville BBQ',
//         city: 'Clarksville',
//         state: 'Tennessee',
//         cuisine: 'cheese curds and brisket'
//     }


//  let { place, city, state, cuisine } = data;

//  // instert into table
//   Food.create({
//     place,
//     city,
//     state,
//     cuisine
//   })
//     .then(Food => res.redirect('/foods'))
//     .catch(err => console.log(err));

// });

// module.exports = router;

const router = require('express').Router()
const db = require("../models")

const { Food, Comment, User } = db


router.get('/', async (req, res) => {
    const foods = await Food.findAll()
    res.json(foods)
})


router.get('/:foodId', async (req, res) => {
    let foodId = Number(req.params.placeId)
    if (isNaN(foodId)) {
        res.status(404).json({ message: `Invalid id "${foodId}"` })
    } else {
        const food = await Food.findOne({
            where: { foodId: foodId },
            include: {
                association: 'comments',
                include: 'author'
            }
        })
        if (!food) {
            res.status(404).json({ message: `Could not find food with id "${foodId}"` })
        } else {
            res.json(food)
        }
    }
})

router.put('/:foodId', async (req, res) => {
    let foodId = Number(req.params.placeId)
    if (isNaN(foodId)) {
        res.status(404).json({ message: `Invalid id "${foodId}"` })
    } else {
        const food = await Food.findOne({
            where: { foodId: foodId },
        })
        if (!food) {
            res.status(404).json({ message: `Could not find food with id "${foodId}"` })
        } else {
            Object.assign(food, req.body)
            await food.save()
            res.json(food)
        }
    }
})

router.delete('/:foodId', async (req, res) => {
    let foodId = Number(req.params.foodId)
    if (isNaN(foodId)) {
        res.status(404).json({ message: `Invalid id "${foodId}"` })
    } else {
        const food = await Food.findOne({
            where: {
                foodId: foodId
            }
        })
        if (!food) {
            res.status(404).json({ message: `Could not find place with id "${foodId}"` })
        } else {
            await food.destroy()
            res.json(food)
        }
    }
})

router.post('/:foodId/comments', async (req, res) => {
    const foodId = Number(req.params.foodId)

    req.body.rant = req.body.rant ? true : false

    const food = await Food.findOne({
        where: { foodId: foodId }
    })

    if (!food) {
        res.status(404).json({ message: `Could not find place with id "${foodId}"` })
    }

    const author = await User.findOne({
        where: { username: req.body.authorId }
    })

    if (!author) {
        res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` })
    }

    const comment = await Comment.create({
        ...req.body,
        foodId: foodId
    })

    res.send({
        ...comment.toJSON(),
        author
    })
})

router.delete('/:foodId/comments/:commentId', async (req, res) => {
    let foodId = Number(req.params.foodId)
    let commentId = Number(req.params.commentId)

    if (isNaN(foodId)) {
        res.status(404).json({ message: `Invalid id "${foodId}"` })
    } else if (isNaN(commentId)) {
        res.status(404).json({ message: `Invalid id "${commentId}"` })
    } else {
        const comment = await Comment.findOne({
            where: { commentId: commentId, foodId: foodId }
        })
        if (!comment) {
            res.status(404).json({ message: `Could not find comment with id "${commentId}" for place with id "${foodId}"` })
        } else {
            await comment.destroy()
            res.json(comment)
        }
    }
})


module.exports = router