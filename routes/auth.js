const express = require('express');
const router = express.Router()
const createError = require('http-errors')
const passport = require('passport')
const USERDATA = require('../model/userData');

//jwt
const { signAccessToken } = require('../helpers/jwt_helper')
const { OTP_Mailer, Welcome_Mailer } = require('../controller/nodemailer')
const { otpMailer } = require('../controller/sendGrid')
const { generateOTP } = require('../helpers/otp-generator');
const { authEmailJoi, authOTPJoi } = require('../helpers/validation_schema')


var newMailUserCheck = false;  //to check new user and send welcome message
var completeCheck = false







router.post('/signUp', async (req, res, next) => {


    try {

        let otp = generateOTP()
        // let otp = 123456;

        const result = await authEmailJoi.validateAsync({ email: req.body.email }) //Joi Validation for incoming registeration details

        let item = {
            email: req.body.email,
            provider: 'mail',
            proPlayer: false,
            superAdmin: false,
            otp: otp,
            discordID: '1002465326342094858'
        }
        console.log(item, 'item')

        const doesExist = await USERDATA.findOne({ email: item.email })

        if (doesExist) {
            if (doesExist.provider != item.provider)
                throw createError.Conflict(`${item.email} is already been registered by ${doesExist.provider}. Use it to login`)
        }


        await otpMailer(req.body.email, otp)
        // const sendOTP = await OTP_Mailer(req.body.email, otp)
        // console.log(sendOTP)


        if (!doesExist) {
            const USER = new USERDATA(item)
            const savedIdData = await USER.save()
            newMailUserCheck = true;
            res.send({ email: savedIdData.email })
        }
        else {
            let otpUpdate = { otp: otp }
            let updateData = { $set: otpUpdate };
            const savedData = await USERDATA.findByIdAndUpdate({ "_id": doesExist._id }, updateData)
            res.send(savedData)
        }
    }

    catch (error) {
        if (error.isJoi === true) {
            res.status(422)
            res.send('Enter email')
        } else {
            res.send({
                error: {
                    status: error.status || 500,
                    message: error.message
                }
            })
        }
    }
})


router.post('/verifyOTP', async (req, res, next) => {


    try {

        const result = await authOTPJoi.validateAsync({ otp: req.body.data.otp })
        if (result) {
            let otp = req.body.data.otp
            let email = req.body.email

            const user = await USERDATA.findOne({
                email: email
            });
            console.log('Console ~ user', user);

            if (!user?.username != null || user?.email != null || user?.profile_pic != null) {
                completeCheck = true
            }

            if (!user) throw createError.Conflict(`${req.body.email} not found`)

            else if (user && user.otp !== otp) throw createError(401, 'Wrong OTP')
            else {

                if (newMailUserCheck) {
                    const welcomeMessage = await Welcome_Mailer(email)
                    newMailUserCheck = false
                }

                let role = user.proPlayer ? 'professional' : 'normal';
                let superAdmin = user.superAdmin ? 'super' : 'normal'
                const accessToken = await signAccessToken({id: user._id.toString(), email, role, superAdmin})
                res.send({ accessToken, completeCheck, isAdmin: user.superAdmin })

            }
        }
    } catch (error) {
        console.log(error)
        if (error.isJoi === true) {
            res.status(422)
            res.send('Enter OTP')
        } else if (error.status === 401) {
            res.status(401)
            res.send('Wrong OTP')
        }
        else {
            res.status(500)
            res.send(error.message)
        }
    }


})


//! Discord Login
router.get('/discord', passport.authenticate('discord'), (err) => {
    if (err) {
        console.log(err, 'errorrrr')
    }

})

router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: "/dashboard1"
}), (req, res) => {
    res.send(200) // Successful auth
});



//!google Save

router.post('/googleSave', async (req, res, next) => {

    try {
        let item = {
            username: req.body.name,
            email: req.body.email,
            provider: req.body.provider,
            proPlayer: false,
            superAdmin: false
        }
        const doesExist = await USERDATA.findOne({ email: item.email })
        if (doesExist) {
            if (doesExist.provider != item.provider) throw createError.Conflict(`${item.email} is already been registered by ${doesExist.provider}. Use it to login`)

            let role = doesExist.proPlayer ? 'professional' : 'normal';
            let superAdmin = doesExist.superAdmin ? 'super' : 'normal'
            const accessToken = await signAccessToken({id: doesExist._id.toString(), email: item.email, role, superAdmin})
            res.send({ accessToken })
        }

        else {
            const USER = new USERDATA(item)
            const savedIdData = await USER.save()
            const welcomeMessage = await Welcome_Mailer(item.email)


            let role = 'normal';
            let superAdmin = 'normal'
            const accessToken = await signAccessToken({id: savedIdData._id.toString(), email: item.email, role, superAdmin})
            res.send({ accessToken })

        }

    }

    catch (error) {
        console.log("error1", error)
        next(error)
    }


})


module.exports = router;
