
const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const CoachData = require('../model/coachData')


router.post('/', async (req, res) => {

    try {

        let item = {
            
            subscriber: req.body.email,
            approve: 'pending',
            pro: req.body.pro_id
        }


        const USER = new CoachData(item)
        const savedIdData = await USER.save()

        res.send(savedIdData)

    } catch (error) {
        console.log(error)
    }



})

router.get('/', async (req, res) => {
    try {

        const userLists = await CoachData.find()
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
