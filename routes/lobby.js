const express = require('express');
const { default: mongoose } = require('mongoose');
const { timeToHours } = require('../helpers/time_helper');
const router = express.Router();

const SubscriberLobby = require('../model/subscriberLobby');
const UserData = require('../model/userData');

router.post('/join/subscriber', async (req, res) => {
  const lobbyExist = await SubscriberLobby.findOne({
    matchId: req.body.lobby,
  });
  // console.log(req.body.lobby)
  // console.log(lobbyExist)
  if(!lobbyExist){
    const item = {
      matchId: req.body.lobby.matchID,
      url: "",
      price: "",
      lobbyDescription: "",
      preferredServer: "",
      gameFormat: "",
      members: [],
      createdBy: req.body.gamerId,
      status: "created",
      lobbyData: req.body.lobby
    }
    item.members.push({
      id: req.body.user._id,
      type: 'sub-user',
    })
    const lobby = new SubscriberLobby(item);
    const newLobbyData = await lobby.save();
    res.send({data: 'joined'});
  }else{
    
    const members = lobbyExist.members.filter(e => e.id == req.body.user._id);
    // console.log(members.length)
    // console.log(lobbyExist.members.length)
    if(lobbyExist.status =="Stopped"){
      res.send({data: "Stopped"});
    }else if(members.length == 1 ){
      res.send({data: "exist"});
    }else if(lobbyExist.members.length >= 3){
      res.send({data: "Lobby Full"});
    }else if(members.length == 0 && lobbyExist.members.length <= 2){
      lobbyExist.members.push({
        id: req.body.user._id,
        type: 'sub-user',
      })
      await lobbyExist.save();
      res.send({data: "joined"});
    }
    // res.send({data: lobbyExist});
  }
});

router.get('/pro/gamer-id/:id', async(req, res) => {
  const lobbyExist = await SubscriberLobby.find({
    createdBy: req.params.id
  });
  res.send({data: lobbyExist});
});

router.get('/match-id/:id', async(req, res) => {
  const lobbyExist = await SubscriberLobby.findOne({
    matchId: req.params.id
  })
  .populate("members.id")
  res.send({data: lobbyExist});
});

router.put('/edit/descandlink', async (req, res) => {
  const lobbyExist = await SubscriberLobby.findOne({
    matchId: req.body.details.matchId
  })
  lobbyExist.lobbyDescription=req.body.details.desc;
  lobbyExist.invite_link=req.body.details.link;
  await lobbyExist.save();
  res.send({data: lobbyExist});
});

router.post('/change/status', async (req, res) => {
  const lobbyExist = await SubscriberLobby.findOne({
    _id: req.body.lobby,
  });
  console.log(req.body.lobby)
  if(lobbyExist){
    if(lobbyExist.status == "Created"){
      console.log(lobbyExist.status)
      lobbyExist.status = "Started"
      await lobbyExist.save();
      res.send({data: lobbyExist});
    }else if(lobbyExist.status == "Started"){
      console.log(lobbyExist.status)
      lobbyExist.status = "Stopped"
      await lobbyExist.save();
      res.send({data: lobbyExist});
    } else {
      res.send({data: "Not Updated"});
    }
  }
});

router.post('/add/timings', async (req, res) => {
  // console.log(req.body.lobby);
  // console.log(req.body.timings);
  const party = await SubscriberLobby.findById(req.body.lobby._id);
  Object.keys(req.body.timings).map(e => {
    party.members.map(m => {
      if(e === m.id.toString()) {
          m.timeSpent = req.body.timings[e];
        }
    })
  })
  console.log(party);
  const a= await party.save();
  res.send({data: a});
});
module.exports = router;
