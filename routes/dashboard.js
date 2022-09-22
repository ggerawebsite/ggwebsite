const express = require('express');
const router = express.Router()
//jwt
const { signAccessToken } = require('../helpers/jwt_helper')
const USERDATA = require('../model/userData')


var completeCheck = false;

const isAuthorized = (req, res, next) => {


    if (req.user) {
        console.log("User is logged in")
        next()
    }
    else {
        console.log("User not logged in")
        res.redirect('/')
    }
}

router.get('/', isAuthorized, async (req, res) => {
    console.log(req.user)
    let role = req.user.proPlayer ? 'professional' : 'professional';
    let superAdmin = req.user.superAdmin ? 'super' : 'normal';
    let email = req.user.email
    const user = await USERDATA.findOne({
        email: email
    });

    if (!user.username != null || user.email != null || user.profile_pic != null) {
        completeCheck = true
    }



    const accessToken = await signAccessToken({id: user._id.toString(),email, role, superAdmin})
    console.log("access token", accessToken)
    res.cookie("access token", accessToken , { httpOnly: true });

    res.redirect(`/loading?token=${accessToken}&complecheck=${completeCheck}`)
})

module.exports = router