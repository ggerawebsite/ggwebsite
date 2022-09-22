const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
app.use(cors());
const createError = require('http-errors');
const session = require('express-session')
const passport = require('passport')
const { verifyAccessToken } = require('./helpers/jwt_helper')
app.use(express.static('public'));
// require 
require('dotenv').config();
require('./helpers/init_mongodb')
require('./controller/bot')
require('./controller/discord')
// app.use 
app.use(express.static(__dirname + '/Client-Side/dist/client'));

app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({      //session creation
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize())
app.use(passport.session())






//? for socket 


const http = require('http');
const server = http.Server(app);
let socketIO = require('socket.io');
const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
require('./controller/socket')(io)







//env variables
const PORT = process.env.PORT || 8887;










// api 
const api = require('./routes/api')
const dashboard1 = require('./routes/dashboard')
const forbidden = require('./routes/forbidden')



app.use('/api', api)
app.use('/forbidden', forbidden)
app.use('/dashboard1', dashboard1)












//-------------HTTP Error Handling -------//

// app.use(async (req, res, next) => {
//     next(createError.NotFound('This route does not exist!!'));
// })

// app.use((err, req, res, next) => {
//     console.log("error outside app.js", err, err.status, err.message)
//     res.status(err.status || 500).send(err.message)
// })




app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/Client-Side/dist/client/index.html'));
});





server.listen(PORT, () => {
    console.log(`.....SERVER started at ${PORT}`)
});

