const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CoachDataSchema = new Schema({

    email: String,
    game:String,
    username:String
    

},
{
  timestamps: true,
});

var coachData = mongoose.model('coachProData', CoachDataSchema);

module.exports = coachData;