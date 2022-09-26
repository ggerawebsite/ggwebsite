const { urlencoded } = require('express');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TransactionSchema = new Schema({

    fromUserId:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        default: null
     },
    toUserId:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        default: null
     },
    type: String,
    amount: String,
    status: String,
    desc: String,
    date: Date,

});

var Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;