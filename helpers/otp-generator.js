

const generateOTP = () => {

  // generate the otp
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log('otp', otp);

  return otp;
};

module.exports = {generateOTP}