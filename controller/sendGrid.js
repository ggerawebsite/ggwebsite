const sgMail = require('@sendgrid/mail');

const otpMailer = async (email,otp)=> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: email,
    from: 'ggera.website@gmail.com', // Use the email address or domain you verified above
    subject: 'GGERA OTP',
    templateId: 'd-84e90e660fc64b9c87a9ca4a8d39d7a2',
    dynamic_template_data: { otp: otp },
    };
    sgMail
    .send(msg)
    .then(() => {
        console.log("OTP Email Send !!!")
    }, error => {
        console.error(error);

        if (error.response) {
        console.error(error.response.body)
        }
    });
}




module.exports = { otpMailer }