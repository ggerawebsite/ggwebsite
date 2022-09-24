const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const { otpMailer } = require('../controller/sendGrid')

/* multer start */
const multer = require('multer');
const { verifyAccessToken } = require('../helpers/jwt_helper');
const ProUserWithdrawRequest = require('../model/proUserWithdrawRequest');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
        );
    }
});

const upload = multer({ storage: storage });


const cpUpload = upload.fields([
    { name: 'image', maxCount: 1 }
]);
/* multer end */

router.post('/', async (req, res) => {
    try {

        let email = req.body.data
        const doesExist = await USERDATA.findOne({ email: email })
        res.send(doesExist)

    } catch (error) {
        console.log(error)

    }
})

router.put('/', async (req, res) => {
    try {

        console.log(req.body)
        let email = req.body.email

        let item = {
            'username': req.body.profile.username,
            'language': req.body.profile.language,
            'country': req.body.profile.country,
            'email': req.body.profile.email,
            'gamer': req.body.profile.gamer,
            'profile_pic': req.body.profile.profile_pic, //photo gets proper string name (without fake path)
            'gamerID': req.body.profile.gamerID,
            'wr': req.body.profile.wr,
            'discord_id': req.body.profile.discord_id,
            'channel_name': req.body.profile.channel_name,
            'kd': req.body.profile.kd,
            'elo': req.body.profile.elo,
            'winrate': req.body.profile.winrate,
            'kills': req.body.profile.kills,
            'wins': req.body.profile.wins,
            'platform': req.body.profile.platform,
            'account_name': req.body.profile.account_name,
            'account_number': req.body.profile.account_number,
            'bank_name': req.body.profile.bank_name,
            'flawless': req.body.profile.flawless,
            'pro_cost': req.body.profile.pro_cost,
            'vip_cost': req.body.profile.vip_cost,
            'about': req.body.profile.about,
            
            'iban_code': req.body.profile.iban_code,
            'swift_code': req.body.profile.swift_code,

        }


        let updateData = { $set: item };

        const savedIdData = await USERDATA.findOneAndUpdate(
            { email: email },
            updateData
        );
        res.send({ savedIdData });

    } catch (error) {
        console.log(error)

    }



})

router.get('/single/:id', async (req, res) => {
    try {

        let id = req.params.id
        const userLists = await USERDATA.findById(id)
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

router.get('/all', async (req, res) => {
    try {
        const userLists = await USERDATA.find()
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/preference', verifyAccessToken, async (req, res) => {
    try {
        const user = req.payload.id;
        const cUser = await USERDATA.findById(user, {preference: 1});
        const preference = Object.assign({selectedGame: ''}, cUser.preference, req.body)
        await USERDATA.findByIdAndUpdate(user, {preference})
        res.send({data: 'OK', error: null})
    } catch (error) {
        console.log(error)
        res.send({data: null, error: error.message})
    }
})

router.get('/my/details', verifyAccessToken, async (req, res) => {
    try {
        const user = req.payload.id;
        const cUser = await USERDATA.findById(user);
        res.send({data: cUser, error: null})
    } catch (error) {
        console.log(error)
        res.send({data: null, error: error.message})
    }
});

router.post('/withdraw', verifyAccessToken, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.payload.id);
        const cUser = await ProUserWithdrawRequest.findOne({
            isApproved: false, userId
        });
        if(cUser) throw new Error('Already request in process')
        const { amount } = req.body
        const data = {
            userId, amount, orderNo: Date.now()
        }
        console.log('Console ~ data', data);
        await ProUserWithdrawRequest.create(data)
        res.status(201);
        res.send({data: 'OK', error: null})
    } catch (error) {
        console.log(error)
        res.status(400);
        res.send({data: null, error: error.message})
    }
});


router.patch('/change/status', async (req, res) => {
        // res.send({data: req.body})
    try {
        const cUser = await USERDATA.findById(req.body.userId);
        cUser.status = req.body.status;
        const data = await cUser.save();
        res.send({data: data, error: null})
    } catch (error) {
        console.log(error)
        res.send({data: null, error: error.message})
    }
})



module.exports = router;
