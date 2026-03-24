const User = require('../models/user');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const sendEmail = require("../utils/sendEmail")

// Signup function

const SignupUser = async (req, res) => {
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
                success: false,
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
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password is required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(401).json({
                message: " Invalid credentials"
            })
        }

        const token = JWT.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        )
        res.status(200).json({
            message: 'login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,

                password: user.password
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}


const getProfile = async (req,res) => {

 const user = await User.findById(req.user.id).select("-password");

 res.json(user);

};


const updateProfile = async (req, res) => {
 try {

  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
   req.user.id,
   { name, email },
   { new: true }
  ).select("-password");

  res.json({
   message: "Profile updated",
   user
  });

 } catch (error) {
  res.status(500).json({
   message: "Server error",
   error: error.message
  });
 }
};

const forgotPassword = async (req, res) => {
 try {

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
   return res.status(404).json({ message: "User not found" });
  }

  const token = JWT.sign(
   { id: user._id },
   process.env.JWT_SECRET,
   { expiresIn: "10m" }
  );
  
await sendEmail("vivekpandit525252@gmail.com", "Test", "Hello Vivek");


  const resetLink = `http://localhost:5173/reset-password/${token}`;

  const message = `Reset your password: ${resetLink}`;

  // 🔥 IMPORTANT
  await sendEmail(user.email, "Reset Password", message);

  res.json({ message: "Email sent successfully" });

 } catch (error) {
  console.log("FULL ERROR:", error); // 🔥 ADD THIS
  res.status(500).json({ message: error.message });
 }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
 try {
  const { token } = req.params;
  const { password } = req.body;

  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(decoded.id, {
   password: hashedPassword
  });

  res.json({ message: "Password updated successfully" });

 } catch (error) {
  res.status(400).json({ message: "Invalid or expired token" });
 }
};


module.exports = { SignupUser, LoginUser, getProfile , updateProfile ,resetPassword, forgotPassword};