const express = require('express');
const router = express.Router()
const subscription=require('../model/subscriptionData')

router.post('/',async function(req,res){
    try{
        const data=req.body
        const sub = new subscription(data)
        const savedSubscriptionData = await sub.save()
        res.send(savedSubscriptionData)

    }
    catch(err){
        console.log(err);
    }
})
router.get('/get',async function(req,res){
    try{
        var subscriptionDetails=await subscription.find();
        res.send(subscriptionDetails);

    }
    catch(err){
        console.log(err);
    }
})





module.exports = router;