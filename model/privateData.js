// assesing mongoose package
const mongoose = require('mongoose');
// database connection

// schema definition
const schema = mongoose.Schema;
const privatemsgSchema= new schema({   
    user:String,
    message:String,
    room:String,
    date:String,
    time:String,
    month:String,
    imgfile:String
},
{
  timestamps: true,
});

// model
var privatedata = mongoose.model('privatemsg',privatemsgSchema);
module.exports = privatedata;