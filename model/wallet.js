const { urlencoded } = require('express');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const WalletSchema = new Schema({

    userId: String,
    balance: Number,


},
{
  timestamps: true,
});

var Wallet = mongoose.model('wallet', WalletSchema);

module.exports = Wallet;