const passport = require("passport"),
        LinkedInStrategy = require("passport-linkedin-oauth2").Strategy,
        GoogleStrategy = require("passport-google-oauth20"),
        keys = require("./keys"),
        database=require("./database"),
        userProfile = database.userprofiles_db;       //require('../models/user-model');

passport.serializeUser(
    function (user, done) {
        done(null, user.id);
    }
);

passport.deserializeUser(
    function (id, done) {
        User.findById(id).then(
            function (user) {
                done(null, user);
            }
        )
    }
);

passport.use(
    new LinkedInStrategy({
        callbackURL: '/auth/linkedin/redirect',
        failureRedirect: '/',
        clientID: keys.linkedIn.clientID,
        clientSecret: keys.linkedIn.clientSecret,
        scope: ['r_basicprofile', 'r_emailaddress']
    },
        (accessToken, refreshToken, profile, done) => {
            userProfile.findOne({ email_id: profile.emails[0].value }).then((currentUser) => {
                if (currentUser) {
                    currentUser.image_path=profile.photos[0].value;
                    currentUser.save().then((updatedUser)=>{
                        updatedUser.accessToken=accessToken;
                        done(null, updatedUser);
                    });
                }
                else {
                    new userProfile({
                        user_name: profile.displayName,
                        email_id: profile.emails[0].value,
                        image_path: profile.photos[0].value,
                        account_status: false,
                        role : "undefined",
                        profile_url: profile._json.url
                    }).save().then((newUser) => {
                        newUser.accessToken=accessToken;
                        done(null, newUser);
                    });
                }
            });
        }));


passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
        (accessToken, refreshToken, profile, done) => {
            userProfile.findOne({ email_id: profile.emails[0].value }).then((currentUser) => {
                if (currentUser) {
                    currentUser.image_path=profile.photos[0].value;
                    currentUser.save().then((updatedUser)=>{
                        updatedUser.accessToken=accessToken;
                        done(null, updatedUser);
                    });
                }
                else {
                    new userProfile({
                        user_name: profile.displayName,
                        email_id: profile.emails[0].value,
                        image_path: profile.photos[0].value,
                        account_status: false,
                        role : "undefined",
                        profile_url: profile._json.url
                    }).save().then((newUser) => {
                        newUser.accessToken=accessToken;
                        done(null, newUser);
                    });
                }
            });
        }));