const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const CoachData = require('../model/coachData')
const TuitionData = require('../model/proCoachData')
const { botMessage } = require('../controller/bot')



router.post('/coaching', async (req, res) => {
    try {


        const doesExist = await USERDATA.findOne({ email: req.body.email })
        const user_name = doesExist.username

        let item = {
            game: req.body.data.game,
            email: req.body.email,
            username: user_name,

        }
        console.log(req.body)
        const USER = new TuitionData(item)
        const savedIdData = await USER.save()
        res.send(savedIdData)

    } catch (error) {
        console.log(error)
    }
})

router.post('/pro', async (req, res) => {
    try {


        const doesExist = await USERDATA.findOne({ username: req.body.id })

        res.send(doesExist)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id/coach', async (req, res) => {
    try {

        let id = req.params.id
        console.log(id)

        const userLists = await CoachData.find({ email: id })

        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

// to fetch lists of requests 
router.get('/coaching-requests', async (req, res) => {
    try {

        console.log("reached")
        const userLists = await CoachData.aggregate([
            {
                $lookup:
                {
                    from: 'userdatas',
                    localField: 'subscriber',
                    foreignField: 'email',
                    as: 'alldata'
                }
            }
        ])
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

router.post('/sendlink_approve', async (req, res) => {

    try {
        let id = req.body.id
        let email = req.body.sub_id
        let pro_id = req.body.pro_id
        console.log(id, email, pro_id)
        const userApprove = await CoachData.findOneAndUpdate(
            { "_id": id },
            { "approve": 'true' }
        )

        const doesExist = await USERDATA.findOne({ email: email })
        const proExist = await USERDATA.findOne({ email: pro_id })
        const twitchID = proExist.channel_name


        //!FOR SOCKET

        // let textmessage = `https://www.twitch.tv/${twitchID}`
        // let item = {
        //     members: [email, pro_id]
        // }

        // const room_created = new Conversation(item)
        // const savedIdData = await room_created.save()
        // res.send(savedIdData)

        //! FOR DISCORD
        const discordID = doesExist.discord_id
        const normal_email = doesExist.email
        const pro_discord = proExist.discord_id
        console.log('check', discordID, twitchID, pro_discord)
        const discordMessage = botMessage(discordID, twitchID, pro_discord)

        if (discordMessage) {


            const user = await USERDATA.findOneAndUpdate(
                { "email": normal_email },
                { "adminReq": true }
            )

        }
        res.send(discordMessage)
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/sendLink_reject',async(req,res)=>{
    try {
        let id = req.body.id
        const userReject = await CoachData.findOneAndUpdate(
            { "_id": id },
            { "approve": 'false' }
        )
        res.send(userReject)
    } catch (error) {
        console.log(error)
    }
})

router.post('/joinparty', async (req, res) => {
    try {

        let email = req.body.id

        const doesExist = await USERDATA.findOne({ email: email })
        const twitchID = doesExist.channel_name
        // const binded = await USERDATA.aggregate([{

        //     $lookup: {
        //         from: "partydatas",
        //         localField: "email",
        //         foreignField: "email",
        //         as: "party_created"
        //     }
        // }])
        // let twitch = twitchID.channel_name

        res.send({ twitchID })
    } catch (error) {
        console.log(error)
    }
})

router.get('/user', async (req, res) => {
  try {
    const username = req.query.q;
    const regex = new RegExp(`^${username}`, 'i');
    const data = await USERDATA.find({
    username: {
        $regex: regex,
      },
    }, {
        username: 1, email: 1
    }).limit(10).lean();

    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
