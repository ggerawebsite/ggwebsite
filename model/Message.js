const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Messagedata = new Schema({

  
    
    messager: {
        type: String
    },
    text:{
        type:String
    },
    



},
    { timestamps: true }
);

var Message = mongoose.model('message', Messagedata);

module.exports = Message;