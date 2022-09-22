const { urlencoded } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({
  id: mongoose.Types.ObjectId,
  type: String,
  timeSpent: String
});

const PartyDataSchema = new Schema(
  {
    title: String,
    url: String,
    price: String,
    lobbyDescription: String,
    preferredServer: String,
    gameFormat: String,
    members: [childSchema],
    createdBy: mongoose.Types.ObjectId,
    status: { type: String },
    isPrivate: Boolean,
    startedAt: Date,
    stoppedAt: Date,
  },
  {
    timestamps: true,
  }
);

var PartyData = mongoose.model('partyData', PartyDataSchema);

module.exports = PartyData;
