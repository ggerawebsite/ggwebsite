const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');

const stripe = require('stripe')(process.env.STRIPE_CODE);



router.post('/', async (req, res) => {
  try {
    const tokenUser = req.payload;
    // const user = await USERDATA.findById(tokenUser.id, {proPlayer: 1});
    // const isSubscribedUser = !user.proPlayer; 
    const {data: { partyId, price, name }} = req.body;
    let amount = +price;
    // if(isSubscribedUser) {
    //   amount = amount - (amount * .01);
    // }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Subscription',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://newggera.herokuapp.com/party/${partyId}/payment/success`,
      cancel_url: `https://newggera.herokuapp.com/party/${partyId}/payment/failure`,
    });
    res.json({ url: session.url });
  } catch (e) {
    console.log('Console ~ e', e);
    res.status(500).json({ error: e.message });
  }
});

router.post('/addtowallet', async (req, res) => {
    console.log(req.body);
    const amount = parseInt(req.body.data)*100;
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Subscription',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',

            success_url: `https://newggera.herokuapp.com/account/`,
            cancel_url: `https://newggera.herokuapp.com/account`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


// router.post('/', async (req, res) => {

//     try {
//         token = req.body.token
//         stripe.customers
//             .create({
//                 email: token.email,
//                 source: token.id
//             })
//             .then((customer) => {
//                 return stripe.paymentIntents.create({
//                     amount: 1000,
//                     description: "Payment",
//                     currency: "USD",
//                     customer: customer.id,
//                 });
//             })
//             .then((charge) => {

//                 res.json({
//                     data: "success"
//                 })
//             })
//             .catch((err) => {
//                 res.json({
//                     data: "failure",
//                 });
//             });
//         return true;
//     } catch (error) {
//         console.log(error)
//         return false;
//     }



// })

router.put('/', async (req, res) => {
    try {

        console.log(req.body)
        let email = req.body.data
        let amount = req.body.amount


        const savedIdData = await USERDATA.updateOne(
            { email: email }, { $inc: { current_balance: amount } }
        )
        res.send({ savedIdData });


    }
    catch (error) {
        console.log(error)
    }
})



module.exports = router;
