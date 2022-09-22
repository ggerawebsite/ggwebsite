const express = require('express');
const router = express.Router();
const UserData = require('../model/userData');
const Transaction = require('../model/transaction');
const createError = require('http-errors');
const CoachData = require('../model/coachData');
const WalletData = require('../model/wallet');
const ProUserWithdrawRequest = require('../model/proUserWithdrawRequest');

const { default: mongoose } = require('mongoose');
const { json } = require('express');

router.get('/user-stats', async (req, res) => {
  try {
    const [subscriber, proUsers, proRequest] = await Promise.all([
      UserData.count({ proPlayer: false }),
      UserData.count({ proPlayer: true }),
      UserData.count({ adminReq: true, proPlayer: false }),
    ]);
    res.send({
      data: {
        subscriber,
        proUsers,
        proRequest,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ data: null, error: error.message });
  }
});

router.get('/pro-request/users', async (req, res) => {
  try {
    const proRequest = await UserData.find({
      adminReq: true,
      proPlayer: false,
    });
    res.send({
      data: {
        users: proRequest,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ data: null, error: error.message });
  }
});

router.patch('/pro-request/user/:id/activate', async (req, res) => {
  try {
    const proRequest = await UserData.findByIdAndUpdate(req.params.id, {
      proPlayer: true,
    });
    res.send({
      data: 'OK',
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ data: null, error: error.message });
  }
});

router.get(
  '/pro-request/withdraw/requests',
  async (req, res) => {
    const data = await ProUserWithdrawRequest.find();
    res.send({ data: data, error: null });
  }
);
router.get(
  '/subscriber-list',
  async (req, res) => {
    const data = await UserData.find(
      {proPlayer:false}
    );
    console.log(data)
    res.send({ data: data, error: null });
  }
);

router.get(
  '/pro-list',
  async (req, res) => {
    const data = await UserData.find(
      {proPlayer:true}
    );
    console.log('ssss pro-list')
    res.send({ data: data, error: null });
  }
);
router.get(
  '/view-profile/:id',
  async (req,res)=>{
    try{
      console.log('entered')
    var id=req.params.id;
    const data = await UserData.find(
      {_id:id}
    );
    console.log('data',data)

    res.send(data)

    }
    catch(err){
     console.log(err);
    }
    
  }
)


router.get(
  '/earnings',
   async(req,res)=>{
     const user_data= await UserData.find({proPlayer:true})
     var total_balance=0;
     for(var i=0;i<user_data.length;i++){
      id=user_data[i]._id;
      const wallet= await WalletData.aggregate([
        {
          $group:{
          _id:id,  
          balance: { $sum: "$balance" }
          }
        }
        
      ])  
      total_balance=total_balance+wallet[0].balance;
     }

     console.log('total balance',total_balance);
    res.send({data:total_balance,error:null})
   }
  );
router.patch(
  '/pro-request/withdraw/requests/:id',
  async (req, res) => {
    const requestData = await ProUserWithdrawRequest.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        isApproved: true,
      }
    );
    await Transaction.create({
      userId: requestData.userId.toString(),
      type: 'withdrawal',
      amount: requestData.amount,
      status: 'success',
      date: new Date(), 
    })
    res.send({ data: 'OK', error: null });
  }
);
router.put('/update-profile/:id',
async (req,res)=>{
  var id=req.params.id;
  var profile=req.body.profile;
  console.log(profile)
  console.log('update',id)
  await UserData.findOneAndUpdate(
    {_id:id},
    profile
  )

  res.send({ data: 'OK', error: null });
})

module.exports = router;
