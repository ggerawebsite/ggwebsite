const express = require('express');
const { default: mongoose } = require('mongoose');
const { timeToHours } = require('../helpers/time_helper');
const router = express.Router();

const PartyData = require('../model/partyData');
const UserData = require('../model/userData');
const Wallet = require('../model/wallet');

router.post('/', async (req, res) => {
  try {
    const tokenUser = req.payload;
    const createdBy = new mongoose.Types.ObjectId(tokenUser.id);
    const item = {
      game: req.body.game,
      gameFormat: req.body.gameFormat,
      lobbyDescription: req.body.lobbyDescription,
      preferredServer: req.body.preferredServer,
      price: req.body.price,
      title: req.body.title,
      url: req.body.url,
      members: [
        {
          id: createdBy,
          type: 'creator'
        }
      ],
      createdBy,
      status: 'idle',
      isPrivate: req.body?.isPrivate || false
    };
    if (req.body.proUserNickname) {
      const proUser = await UserData.findOne({
        username: req.body.proUserNickname,
      });
      if (!proUser) throw new Error('Pro Username not found');
      item.members.push({
        id: proUser._id,
        type: 'pro-user',
      });
    }
    const USER = new PartyData(item);
    const savedIdData = await USER.save();
    res.send({ data: savedIdData, error: null });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

router.patch('/:id/add-user', async(req, res) => {
  try {
    const tokenUser = req.payload;
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cUser = new mongoose.Types.ObjectId(tokenUser.id);
    const party = await PartyData.findById(id);
    if(party.members.length >= 5) throw new Error('Slots limit reached');
    if(party.members.find(e => e.id === cUser)) throw new Error('Already added')
    party.members.push({
      id: cUser,
      type: 'sub-user',
    })
    await party.save();
    res.send({ data: party, error: null });
  } catch (error) {
    res.status(500);
    res.send({ error: error.message });
  }
})

router.patch('/:id/member-time', async(req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    // const tokenUser = req.payload;
    // const cUser = new mongoose.Types.ObjectId(tokenUser.id);
    const party = await PartyData.findById(id);
    const data = req.body;
    Object.keys(data).map(e => {
      party.members.map(m => {
        if(e === m.id.toString()) {
          m.timeSpent = data[e];
        }
      })
    })
    await party.save();
    let amount = 0;
    console.log("welll");
    console.log(party);
    await party.members.filter(e => e.type === 'sub-user').map(async e => {
      const timeToHrs =await timeToHours(e.timeSpent);
      amount += timeToHrs * party.price;
      const userWallet = await Wallet.findOne({userId: e.id});
      if(!userWallet) throw new Error('Wallet not found');
      userWallet.balance = userWallet.balance-(timeToHrs*party.price)
      await userWallet.save();
    });
    await Wallet.updateOne({
      userId: party.createdBy.toString()
    }, {
      $inc: {
        balance: amount 
      }
    }, {
      upsert: true
    });
    console.log("hi");
    res.send({ data: party, error: null });
  } catch (error) {
    res.status(500);
    res.send({ error: error.message });
  }
})

router.patch('/:id/start', async(req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    await PartyData.updateOne({_id: id}, {
      status: 'inProgress',
      startedAt: new Date()
    })
    res.send({ data: 'OK', error: null });
  } catch (error) {
    res.status(500);
    res.send({ error: error.message });
  }
})

router.patch('/:id/stop', async(req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    await PartyData.updateOne({_id: id}, {
      status: 'stopped',
      stoppedAt: new Date()
    });
    res.send({ data: 'OK', error: null });
  } catch (error) {
    res.status(500);
    res.send({ error: error.message });
  }
})

router.get('/:id/details', async(req, res) => {
  try {
    const party = await PartyData.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          "from": 'userdatas',
          localField: 'members.id',
          foreignField: '_id',
          "as": 'users',
          "pipeline": [{
            $project: {
              username: 1, profile_pic: 1, channel_name: 1, discord_id: 1, about: 1, elo: 1, kd: 1
            }
          }]
        }
      }
    ]);
    res.send({ data: party[0], error: null });
  } catch (error) {
    console.log('Console ~ error', error);
    res.send({ error: error.message });
  }
})

router.get('/:id/channel', async(req, res) => {
  try {
    // const tokenUser = req.payload;
    // const id = new mongoose.Types.ObjectId(req.params.id);
    // const cUser = new mongoose.Types.ObjectId(tokenUser.id);
    const party = await PartyData.findById(req.params.id, {createdBy: 1});
    if(!party) throw new Error('Party Not Found')
    const user = await UserData.findById(party.createdBy)
    res.send({ data: user, error: null });
  } catch (error) {
    res.send({ error: error.message });
  }
})

router.get('/', async (req, res) => {
  try {
    const userLists = await PartyData.aggregate([
      {
        $match: {
          status: 'idle'
        }
      },
      {
        $lookup: {
          "from": 'userdatas',
          localField: 'members.id',
          foreignField: '_id',
          "as": 'users',
          "pipeline": [{
            $project: {
              username: 1, profile_pic: 1, channel_name: 1, discord_id: 1, about: 1, elo: 1, kd: 1
            }
          }]
        }
      }
    ]);
    res.send(userLists);
  } catch (error) {
    console.log(error);
  }
});

router.get('/my', async (req, res) => {
  try {
    const tokenUser = req.payload;
    console.log('Console ~ tokenUser', tokenUser);
    const cUser = new mongoose.Types.ObjectId(tokenUser.id);
    const userLists = await PartyData.aggregate([
      {
        $match: {
          createdBy: cUser
        }
      },
      {
        $lookup: {
          "from": 'userdatas',
          localField: 'members.id',
          foreignField: '_id',
          "as": 'users',
          "pipeline": [{
            $project: {
              username: 1, profile_pic: 1, channel_name: 1, discord_id: 1, about: 1, elo: 1, kd: 1
            }
          }]
        }
      }
    ]);
    res.send(userLists);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({error: error.message});
  }
});

router.get('/can-create', async (req, res) => {
  try {
    const tokenUser = req.payload;
    const user = await UserData.findOne(
      {
        _id: new mongoose.Types.ObjectId(tokenUser.id),
        $and: [
          { discord_id: { $exists: true } },
          { channel_name: { $exists: true } },
        ],
      },
      { discord_id: 1, channel_name: 1 }
    );
    res.send(!!user);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: error.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const userLists = await PartyData.aggregate([
      {
        $match: {
          // status: 'idle'
        }
      },
      {
        $lookup: {
          "from": 'userdatas',
          localField: 'members.id',
          foreignField: '_id',
          "as": 'users',
          "pipeline": [{
            $project: {
              username: 1, profile_pic: 1, channel_name: 1, discord_id: 1, about: 1, elo: 1, kd: 1
            }
          }]
        }
      }
    ]);
    res.send(userLists);
  } catch (error) {
    console.log(error);
  }
});
router.get('/all/query', async (req, res) => {
  console.log(req.query)
    let query={};

  if(req.query.date == "today"){
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    query['createdAt']= {
        $gte: start, $lt: end
    };
  }
  if(req.query.date == "week"){
    query['createdAt']= {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
    };
  }
  if(req.query.date == "month"){
    query['$and']=  [
        { createdAt: { $gt: new Date(new Date().getFullYear(), new Date().getMonth())} },
        { createdAt: { $lt: new Date(new Date().getFullYear(), new Date().getMonth()+1) } },
      ];
  } 
  if(req.query.date == "year"){
      query['$and']=  [
          { createdAt: { $gt: new Date(new Date().getFullYear(), 0)} },
          { createdAt: { $lt: new Date(new Date().getFullYear()+1, 0) } },
        ];
  }  

    const userLists = await PartyData.find(query);
    res.send(userLists);
});

module.exports = router;
