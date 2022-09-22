const express = require('express');
const GameData = require('../model/gameData');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let item = {
      name: req.body.name,
      image:req.body.image
    };
    const data = new GameData(item);
    const savedIdData = await data.save();
    res.send(savedIdData);
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const gameLists = await GameData.find();
    res.send(gameLists);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
