const { urlencoded } = require('express');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const GameDataSchema = new Schema({
    name: String,
    image:String
});

var GameData = mongoose.model('gameData', GameDataSchema);

module.exports = GameData;