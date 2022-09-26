
const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const CoachData = require('../model/coachData')

const Wallet = require('../model/wallet')
const Transaction = require('../model/transaction');
const UserData = require('../model/userData');

router.post('/add/money', async (req, res) => {

    let transaction = {
        fromUserId: req.body.userId,
        toUserId: req.body.userId,
        type: 'addMoneyToWallet',
        amount: req.body.amount,
        status: "success",
        desc: "Adding Money to User Wallet",
        date: Date.now()
    }

    const data = await Wallet.findOne({
        userId: req.body.userId,
    });
    if(data){
        data.balance = parseInt(data.balance) + parseInt(req.body.amount);
        const savedIdData = await data.save()

        const datas = new Transaction(transaction)
        await datas.save()

        res.send(savedIdData)
    }else{
        try {
    
            let item = {
                userId: req.body.userId,
                balance: req.body.amount
            }
            const USER = new Wallet(item)
            const savedIdData = await USER.save()

            const data = new Transaction(transaction)
            await data.save()

            res.send(savedIdData)
    
        } catch (error) {
            console.log(error)
        }
        
        
    }
})
router.post('/add/money/pro', async (req, res) => {

    let transaction = {
        toUserId: req.body.userId,
        type: 'addMoneyToProWallet',
        amount: req.body.amount,
        status: "success",
        desc: req.body.desc,
        date: Date.now()
    }

    const data = await Wallet.findOne({
        userId: req.body.userId,
    });
    if(data){
        data.balance = parseInt(data.balance) + parseInt(req.body.amount);
        const savedIdData = await data.save()

        const datas = new Transaction(transaction)
        await datas.save()

        res.send(savedIdData)
    }else{
        try {
    
            let item = {
                userId: req.body.userId,
                balance: req.body.amount
            }
            const USER = new Wallet(item)
            const savedIdData = await USER.save()

            const data = new Transaction(transaction)
            await data.save()

            res.send(savedIdData)
    
        } catch (error) {
            console.log(error)
        }
        
        
    }
})
router.post('/details', async (req, res) => {
    let userData = {
        userId: req.body.userId,
        balance: 0
    }
    const data = await Wallet.findOne({userId: userData.userId}).lean()
    const tmp = Object.assign({}, userData, data);
    res.send(tmp);

})
router.post('/transactions/details', async (req, res) => {
    let userdata = {
        userId: req.body.userId
    }
    const data = await Transaction.find({userId: userdata.userId})
    res.send(data);

})

router.post('/reduce/money', async (req, res) => {
    const data = await Wallet.findOne({userId: req.body.userId});
    data.balance= data.balance - req.body.amount;
    data.balance= data.balance - req.body.amount;
    const updatedData = await data.save();
    let transaction = {
        fromUserId: req.body.userId,
        type: req.body.type,
        amount: req.body.amount,
        status: "success",
        desc: req.body.desc,
        date: Date.now()
    }
    const data1 = new Transaction(transaction)
    await data1.save()

    res.send(updatedData);
})

router.post('/add/money/admin', async (req, res) => {
    const user = await UserData.findOne({superAdmin : true});
    const data = await Wallet.findOne({userId: user._id});
    console.log(user)
    let transaction = {
        toUserId: user._id,
        type: 'addMoneyToAdminWallet',
        amount: req.body.amount,
        status: "success",
        desc: req.body.desc,
        date: Date.now()
    }
    if(data){
        data.balance= data.balance + req.body.amount;
        await data.save();

        const data1 = new Transaction(transaction)
        await data1.save()

        res.send(data)
    }else{
        
        let item = {
            userId: user._id,
            balance: req.body.amount
        }
        const USER = new Wallet(item)
        const savedIdData = await USER.save()

        const data = new Transaction(transaction)
        await data.save()

        res.send(savedIdData)
    }
})

router.get('/balance/:id', async (req, res) => {
    try {

        let id = req.params.id
        const userLists = await Wallet.findOne({
            userId: id
        })
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

router.get('/transactions/all', async (req, res) => {
    try {
        const userLists = await Transaction.find().populate("toUserId fromUserId");
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})
router.get('/transactions/all/:userType', async (req, res) => {
    let userType = req.params.userType
    let type= "";
    if(userType == 'admin'){
        type = "addMoneyToAdminWallet"
    }
    if(userType == 'pro'){
        type = "addMoneyToProWallet"
    }
    
    try {
        const userLists = await Transaction.find({type: type}).populate("toUserId fromUserId");
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})
router.get('/transactions/query', async (req, res) => {
    // console.log(req.query)
    let userLists;
    let query = {};
    
    if(req.query.type){
        query['type']=req.query.type;
        
    }
    
    if(req.query.date == "today"){
        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);

        query['date']= {
            $gte: start, $lt: end
        };
    } 
    if(req.query.date == "week"){
        query['date']= {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        };
    } 
    if(req.query.date == "month"){
        query['$and']=  [
            { date: { $gt: new Date(new Date().getFullYear(), new Date().getMonth())} },
            { date: { $lt: new Date(new Date().getFullYear(), new Date().getMonth()+1) } },
          ];
    } 
    if(req.query.date == "year"){
        query['$and']=  [
            { date: { $gt: new Date(new Date().getFullYear(), 0)} },
            { date: { $lt: new Date(new Date().getFullYear()+1, 0) } },
          ];
    } 
        
    // console.log(query)
    userLists = await Transaction.find(query).populate("toUserId fromUserId");
    
    // console.log(query)
    
    
    res.send(userLists)
})

module.exports = router;
