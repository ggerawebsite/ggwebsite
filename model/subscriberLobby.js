const { urlencoded } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({
  id: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdata"
 }],
  type: String,
  timeSpent: String
});

const SubscriberLobbySchema = new Schema(
  {
    matchId: String,
    url: String,
    price: String,
    lobbyDescription: String,
    preferredServer: String,
    gameFormat: String,
    members: [childSchema],
    createdBy: String,
    status: { type: String },
    isPrivate: Boolean,
    startedAt: Date,
    stoppedAt: Date,
    lobbyData: {},
    invite_link: String
  },
  {
    timestamps: true,
  }
);

var PartyData = mongoose.model('subscriberLobby', SubscriberLobbySchema);

module.exports = PartyData;
