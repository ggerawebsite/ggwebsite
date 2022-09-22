const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProUserWithdrawRequestSchema = new Schema(
  {
    orderNo: String,
    amount: String,
    userId: { type: mongoose.Types.ObjectId, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

var ProUserWithdrawRequest = mongoose.model(
  'proUserWithdrawRequest',
  ProUserWithdrawRequestSchema
);

module.exports = ProUserWithdrawRequest;
