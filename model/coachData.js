const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CoachDataSchema = new Schema({
    order_no: String,
    subscriber: String,
    pro: String,
    approve: String

});

var coachData = mongoose.model('coachData', CoachDataSchema);

module.exports = coachData;