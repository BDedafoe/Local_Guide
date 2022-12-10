// const User = require('../models/user')
// const Note = require('../models/note')
// const bcrypt = require('bcrypt')
// const db = require("../models")

// const { } = db

// // @desc Get all users
// // @route GET /users
// // @access Private
// const getAllUsers = async (req, res) => {
//     // Get all users from MongoDB
//     const users = await User.find().select('-password').lean()

//     // If no users 
//     if (!users?.length) {
//         return res.status(400).json({ message: 'No users found' })
//     }

//     res.json(users)
// }

// // @desc Create new user
// // @route POST /users
// // @access Private
// const createNewUser = async (req, res) => {
//     const { username, password, roles } = req.body

//     // Confirm data
//     if (!username || !password) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Check for duplicate username
//     const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     // Hash password 
//     const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

//     const userObject = (!Array.isArray(roles) || !roles.length)
//         ? { username, "password": hashedPwd }
//         : { username, "password": hashedPwd, roles }

//     // Create and store new user 
//     const user = await User.create(userObject)

//     if (user) { //created 
//         res.status(201).json({ message: `New user ${username} created` })
//     } else {
//         res.status(400).json({ message: 'Invalid user data received' })
//     }
// }

// // @desc Update a user
// // @route PATCH /users
// // @access Private
// const updateUser = async (req, res) => {
//     const { id, username, roles, active, password } = req.body

//     // // Confirm data 
//     // if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
//     //     return res.status(400).json({ message: 'All fields except password are required' })
//     // }

//     // Does the user exist to update?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     // Check for duplicate 
//     const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     // Allow updates to the original user 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     user.username = username


//     if (password) {
//         // Hash password 
//         user.password = await bcrypt.hash(password, 10) // salt rounds 
//     }

//     const updatedUser = await user.save()

//     res.json({ message: `${updatedUser.username} updated` })
// }

// // @desc Delete a user
// // @route DELETE /users
// // @access Private
// const deleteUser = async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user still have assigned notes?
//     const note = await Note.findOne({ user: id }).lean().exec()
//     if (note) {
//         return res.status(400).json({ message: 'User has assigned notes' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// }

// module.exports = {
//     getAllUsers,
//     createNewUser,
//     updateUser,
//     deleteUser
// }

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

//Web Token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60d'
    });
};

//Register User
const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    if(!username || !password || !email) {
        res.status(400)
        throw new Error('Please enter all fields');
    }
    
    //Something is wrong here
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if(usernameExists || emailExists) {
        res.status(400)
        throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        password: hashedPassword,
        email
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: signToken(user._id)
            
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
});


//Login User 
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            // message : {
            //     msgBody: "Successfully logged in user",
            //     msgError: false
            // },
            user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: signToken(user._id)
            }
        });
    } else {
        res.status(401)
        throw new Error('Invalid username or password');
    }
});
    
//User Profile
const profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        res.status(200).json(req.user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


//Logout
const logout = (req, res) => {
    res.clearCookie('access_token');
    res.json({
        // message : {
        //     msgBody: "Successfully logged out user",
        //     msgError: false
        // },
        user: {
            username: ""
        },
        success: true
    });
}

//Check if user is authenticated
const isAuthenticated = (req, res) => {
    if (req.cookies.access_token && req.isAuthenticated()) {
        const { username } = req.user;
        res.status(200).json({
            isAuthenticated: true,
            user: {
                username
            }
        });
    } else {
        res.status(403).json({
            isAuthenticated: false,
            user: {
                username: ""
            }
        });
    }
}

module.exports = {
    register,
    login,
    profile,
    logout,
    isAuthenticated
};