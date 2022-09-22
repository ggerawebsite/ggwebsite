const Joi = require('joi')


//Joi autherization schema
const authEmailJoi = Joi.object({

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

})


const authOTPJoi = Joi.object({

    otp: Joi.number()
        .required(),



})





module.exports = { authEmailJoi, authOTPJoi }