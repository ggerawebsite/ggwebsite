
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
        userId: req.body.userId,
        type: 'addMoneyToWallet',
        amount: req.body.amount,
        status: "success",
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
    const updatedData = await data.save();
    res.send(updatedData);
})

router.post('/add/money/admin', async (req, res) => {
    const user = await UserData.findOne({superAdmin : true});
    const data = await Wallet.findOne({userId: user._id});
    console.log(user)
    let transaction = {
        userId: user._id,
        type: 'addMoneyToWallet',
        amount: req.body.amount,
        status: "success",
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
        const userLists = await Transaction.find().populate("userId");
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
