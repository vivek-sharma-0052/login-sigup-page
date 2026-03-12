const User = require('../models/user');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


// Signup function

const SignupUser = async (req , res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            })
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();   

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const LoginUser = async (req , res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message : "Email and password is required"
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message : 'Invalid credentials'
            })
        }
        const ismatch = await bcrypt.compare(password , user.password)
        if(!ismatch){
     return res.status(401).json({
        message : " Invalid credentials"
     })
    }
    
    const token = JWT.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn: "2d"}
    )
    res.status(200).json({
        message : 'login successful',
        token,
        user : {
        id : user._id,
        name : user.name,
        password : user.password
        }        
    })
    } catch (error) {
        res.status(500).json({
            message : 'Server error',
            error : error.message
        })
    }
}

module.exports = { SignupUser , LoginUser};