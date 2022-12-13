const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const db = require("../models")

const { User } = db

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