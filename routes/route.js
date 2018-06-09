const express = require("express");
const route = express.Router(),
      auth = require("../controller/auth"),
      login = require("../controller/login"),
      profile = require("../controller/profile"),
      chat = require("../controller/chat"),
      passport = require("passport"),
      database=require('../config/database'),
      sendMail=require('../config/nodemailer');


route.get('/', (req, res) => {
    if(!req.session.token || !req.session.hashid){
        res.render("../view/index");
    }else{
        res.redirect('/profileHome/'+req.session.hashid);
    }
});


route.post('/profile/answers',profile.answers);
route.get('/profile/questions/:profileId/:role',profile.questions);
route.get('/profileHome/:profileId',profile.home);
route.get('/profile/editanswers',profile.editanswers);
route.get('/view/success',profile.success);

// Chat Page
route.get('/bot/:code', chat.startChat);
route.get('/findIntent', chat.chatIntent);
route.get('/findAnswer', chat.chatResponse);

//Scope APIs
route.get('/auth/facebook', auth.facebookScope);
route.get('/auth/google', auth.googleplusScope);
route.get('/auth/linkedin', auth.linkedinScope);

//Facebook Profile Authentication
route.get('/auth/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }), auth.facebookAuth);

//Google Profile Authentication
route.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/auth/google' }), auth.googleplusAuth);

//LinkedIn Profile Authentication
route.get('/auth/linkedin/redirect', passport.authenticate('linkedin', { failureRedirect: '/auth/linkedin' }), auth.linkedInAuth);

route.get('/auth/google/profile', auth.profile); 
route.get('/auth/facebook/profile', auth.profile);
route.get('/auth/linkedin/profile', auth.profile);

//Login Page
route.get('/signup', login.loginPage);

// AboutUs Page
route.get('/aboutus', login.loginPage);

// ContactUs Page
route.get('/contactus', login.loginPage);


//Logout Page
route.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

// Send MAIL
route.post('/sendmail',(req,res)=>{
    let params=req.body;
    if(params.name && params.email && params.number){
        let user={
            name : req.body.name,
            email : req.body.email,
            number : req.body.number
        }
        sendMail(user).then((resp)=>{
            res.json(resp);
        }).catch((err)=>{
            res.json(err);
        });
    }else{
        res.json({status:0,msg:"Invalid Number of Parameters"});
    }
});

module.exports = route;