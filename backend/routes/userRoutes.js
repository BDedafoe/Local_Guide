const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router

// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/usersController');
// const { protect } = require('../middleware/authorization');
// //Routes
// //Create a new user
// router.post('/register', userController.register);
// //Login a user
// router.post('/login', userController.login);
// //Logout a user
// router.get('/logout', userController.logout);
// //Check if user is authenticated
// router.get('/authenticated', userController.isAuthenticated);
// //User profile
// router.get('/me', protect , userController.profile);



// module.exports = router;