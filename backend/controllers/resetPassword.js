const Client = require('../models/clientModel')
const crypto = require('crypto');
const { sendMail } = require('../utility/mailSender');
const bcrypt = require('bcrypt')

exports.tokenResetLink = async (req,res) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                success : false,
                msg : "Email field is required"
            })
        }
        const user = await Client.findOne({email : email});
        if(!user){
            return res.status(404).json({
                success : false,
                msg : "User not found with this email"
            })
        }

        const token = crypto.randomBytes(20).toString('hex');

        await Client.findOneAndUpdate ( {email}, {
            token : token,
            tokenExpire : Date.now() + 5 * 60 * 1000
        },{new:true});

       

        const emailTitle  = " Password Reset Link From Help N Groww"
        const url = `http://localhost:3000/reset/password/${token}`
        await sendMail(email , emailTitle , `click on link to reset your Password ${url}`)

        return res.status(200).json({
            success: true,
            msg: "Email sent successfully, Please check email and change password"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            msg: "Some error occurred while sending mail for reset password"
        })
    }
}

exports.resetPassword = async(req,res) => {
    try {
        const {password , confirmPassword , token} = req.body;
        if(!token){
            return res.status(400).json({
                success: false,
                msg:"Token is Exprire Please Retry"
            })
        }
        if(!password || !confirmPassword ) {
            return res.status(400).json({
                success : false,
                msg : "All fields are required"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                msg : "Password do not match"
            })
        }
        const user = await Client.findOne({token: token})
      
         
        if(!user){
            return res.status(404).json({
                success : false,
                msg : "invalid token"
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10)

        await Client.findOneAndUpdate(
            { token },
            {
                password: hashedPassword,
                token: null, 
                tokenExpire: null
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            msg: "Password Reset Successfully"
        })
    }  catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            msg: "Some error occurred while resetting password"
        })
    }
}