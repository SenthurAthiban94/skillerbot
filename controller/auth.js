const passport = require("passport");
const userProfile = require('../models/user-model');
const fresherQuestion = require('../models/fresher-Questions');

//Scope page for google +
exports.googleplusScope = passport.authenticate('google',{
    scope:['profile','email']
});

//scope page for Linkedin
exports.linkedinScope = passport.authenticate('linkedin',{
    scope:['r_basicprofile','r_emailaddress']
});

//scope page for FaceBook
exports.facebookScope = passport.authenticate('facebook',{
    scope:['r_basicprofile','r_emailaddress']
});

//Google plus authentication API
exports.googleplusAuth = (req, res) => {
    userProfile.findOne({'email_id': req.user.email_id}).then((data)=>{
        if (req.user.account_status){
            res.redirect("/bot/"+req.user.url_code);
        }
        else{
            res.redirect("/auth/google/profile?_id="+ req.user._id);
        }
    }).catch((err)=>{
        res.status(404).redirect('/auth/google');
    });
}

//LinkedIn Authentication API
exports.linkedInAuth = (req, res) => {
    userProfile.findOne({ 'email_id': req.user.email_id }).then((data)=>{
        if (req.user.account_status){
            res.send("Existing user");
        }
        else{
            res.redirect("/auth/linkedin/profile?_id=" + req.user._id);
        }
    }).catch((err)=>{
        res.status(404).redirect('/auth/linkedin');
    });
}

//Facebook Authentication API
exports.facebookAuth = (req, res) => {
    userProfile.findOne({'email_id': req.user.email_id}).then((data)=>{
        if (req.user.account_status){
            res.send("Existing user");
        }
        else{
            res.redirect("/auth/facebook/profile?_id="+ req.user._id);
        }
    }).catch((err)=>{
        res.status(404).redirect('/auth/facebook');
    });
}

//Profile page route API
exports.profile = (req, res) => {
    let parsedata={};
    userProfile.findOne({"_id": req.query._id}).then((data)=>{
        fresherQuestion.findOne({}).then((docs) => {
            questions=[];
            for (var key_val in docs.questions_Array[0]) {
                questions = docs.questions_Array[0];
            }
            data['questions']=questions;
            res.render("../view/profile", {
                "data": data,
                "questions" : questions
            });
        }).catch((err)=>{
            res.status(404).redirect('/');
        });
    }).catch((err)=>{
        res.status(404).redirect('/');
    });    
}