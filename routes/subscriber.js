const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const CoachData = require('../model/coachData')
const TuitionData = require('../model/proCoachData')









// to fetch lists of requests 
router.get('/subscriber-requests', async (req, res) => {
    try {

        const userLists = await CoachData.aggregate([
            {
                $lookup:
                {
                    from: 'userdatas',
                    localField: 'pro',
                    foreignField: 'email',
                    as: 'alldata'
                }
            }
        ])
        console.log('test', userLists[1].alldata)
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})










module.exports = router;
