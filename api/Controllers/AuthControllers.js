const Users = require("../models/UserModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendEmailOTP = require("../Utilities/nodeMailer");
const uuid = require('uuid')

const { v4: uuidv4 } = uuid

const signupController = async (req, res) => {
    try {
        const {userName, email, password, age} = req.body
        if (!userName || !email || !password || !age) {
            res.json({
                status: false,
                message: "All fields are required."
            })
        }

        bcrypt.hash(req.body.password, 12, async function(err, hash) {
            // Store hash in your password DB.
            req.body.password = hash

            const OTP = uuidv4().split('-')[0]
            const messageByTransporter = await sendEmailOTP(req.body.email, OTP)
            console.log(OTP)    

            await Users.create({
                ...req.body,
                otp: OTP
            })
            
        res.json({
            status: true,
            message: `User signedup successfully, ${messageByTransporter}`
        })
        });

    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: error.message
        })
    }
}
const loginController = async (req, res) => {
    const {email, password} = req.body

    const myUser = await Users.findOne({
        email: email
    })

    if (!myUser) return res.json({
        status: false,
        message: "No user found"
    })

    bcrypt.compare(password, myUser.password, function(err, result) {
        if (result) {
        // result == true
        const token = jwt.sign({
            id: myUser._id,
            userName: myUser.userName,
            email: myUser.email
        }, process.env.JWT_SECRET, { expiresIn: 10 * 60 })
    
        res.json({
            status: true,
            message: "User loggedin successfully.",
            token: token
        })

        } else {
            return res.status(404).json({
                status: false,
                message: "Invalid Credintials"
            })
        }
    });

}

module.exports = { signupController, loginController }