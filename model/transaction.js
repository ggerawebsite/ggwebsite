const { urlencoded } = require('express');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TransactionSchema = new Schema({

    userId: String,
    type: String,
    amount: String,
    status: String,
    date: Date,

});

var Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;