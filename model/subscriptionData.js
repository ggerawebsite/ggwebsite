const mongoose = require('mongoose');

const schema = mongoose.Schema;
const subscriptionSchema= new schema({ 
    title:String,
    amount:Number,
    duration:String,
    hours:Number,
    details:[String],
    offers:[String],
    isActive:{type:Boolean,default:true,index:true}
});

// model
var subscriptiondata = mongoose.model('subscriptionplan',subscriptionSchema);
module.exports = subscriptiondata;