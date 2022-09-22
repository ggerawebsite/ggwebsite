const createError = require('http-errors');
const passport = require('passport')
const { Strategy } = require('passport-discord');
const USERDATA = require('../model/userData');
const {Welcome_Mailer} = require('./nodemailer')






passport.serializeUser((user, done) => {
    console.log('serializer')
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log( 'deserializer')
        const user = await USERDATA.findById(id)
        done(null, user)

    } catch (err) {
        console.log(err, 'deserializer')
        done(err, null)
    }
});


passport.use(new Strategy({

    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email']
},
    async (accessToken, refreshToken, profile, done) => {

        try {

            const discordUser = await USERDATA.findOne({ email: profile.email })

            if (discordUser) {
                if (discordUser.provider === 'discord') {
                    return done(null, discordUser)
                }
                else {
                    return done(null, null)

                }
            }
            else {

                let item = {
                    username: profile.username,
                    email: profile.email,
                    provider: profile.provider,
                    proPlayer: false,
                    discordID: profile.id
                }

                const USER = await USERDATA(item)
                const savedIdData = await USER.save()
                const welcomeMessage = await Welcome_Mailer(item.email)

                console.log("User Created",welcomeMessage)

                return done(null, savedIdData)
            }


        } catch (err) {
            return done(err, null)
        }

    })
)
