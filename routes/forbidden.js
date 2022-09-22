const express = require('express');
const router = express.Router()

router.get('/', async (req, res) => {
    res.send("You have an account with different provider (google/email . Please Sign In with that." )
})

module.exports = router