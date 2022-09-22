const mongoose = require('mongoose');


const Schema=mongoose.Schema;
const AdminReqSchema = new Schema({
   
    email:String,
    country:String,
    game:String,
    platform:String,
    kills:String,
    kd:String,
    wins:String,
    approve:Boolean

    
},
{
  timestamps: true,
});

//Model creation
var AdminReqData=mongoose.model('AdminReqData',AdminReqSchema);
module.exports=AdminReqData;