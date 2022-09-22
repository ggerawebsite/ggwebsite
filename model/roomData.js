// assesing mongoose package
const mongoose = require('mongoose');
// database connection


// schema definition
const schema = mongoose.Schema;
const roomSchema= new schema({   
    name: String,
    members:Array

});

// model
var roomdata = mongoose.model('roomdata',roomSchema);
module.exports = roomdata;