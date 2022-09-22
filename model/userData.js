const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userDataSchema = new Schema({

    username: String,
    otp: Number,
    profile_pic: String,
    language: String,
    phone_number: String,
    channel_name: String,
    email: String,
    provider: String,
    proPlayer: Boolean,
    superAdmin: Boolean,
    adminReq: Boolean,
    discord_id: String,
    current_balance: { type: Number, default: 0 },
    status: Boolean,
    country: String,
    gamer: String,
    gamerID: String,
    wr: String,
    kd: String,
    elo: String,
    winrate: String,
    kills: String,
    wins: String,
    platform: String,
    account_name: String,
    account_number: String,
    bank_name: String,
    flawless:String,
    pro_cost:String,
    vip_cost:String,
    about:String,
    iban_code:String,
    swift_code:String,
    status: { type: String, default: 'offline' },
    preference: {
        selectedGame: String, default: ''
    }

},
{
  timestamps: true,
});

var UserData = mongoose.model('userdata', userDataSchema);

module.exports = UserData;