const passport = require("passport");
const database=require("../config/database");
const userProfile = database.userprofiles_db;                   //require('../models/user-model');
const fresherQuestion = database.fresher_questions_db;          //require('../models/fresher-Questions');
const userRoles = database.roles_db;                            //require('../models/user-roles');

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
    req.session.token = req.user.accessToken;
    req.session.hashid=req.user._id;
    userProfile.findOne({'email_id': req.user.email_id}).then((data)=>{
        if (data && data.account_status){
            res.redirect("/profileHome/"+data._id);
        }
        else{
            res.redirect("/auth/google/profile?_id="+ req.user._id);
            // res.redirect("/auth/google/getRole?_id="+ req.user._id);
        }
    }).catch((err)=>{
        res.status(404).redirect('/auth/google');
    });
}

//LinkedIn Authentication API
exports.linkedInAuth = (req, res) => {
    req.session.token = req.user.accessToken;
    req.session.hashid=req.user._id;
    userProfile.findOne({ 'email_id': req.user.email_id }).then((data)=>{
        if (data && data.account_status){
            res.redirect("/profileHome/"+data._id);
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
    req.session.token = req.user.accessToken;
    req.session.hashid=req.user._id;
    userProfile.findOne({'email_id': req.user.email_id}).then((data)=>{
        if (data && data.account_status){
            res.redirect("/profileHome/"+data._id);
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
    if(req.session.token && req.session.hashid){
        res.cookie('token', req.session.token);
        res.cookie('hashid',req.session.hashid);
        let parsedata={};
        userProfile.findOne({"_id": req.query._id}).then((data)=>{
            userRoles.findOne({"id":'Role'}).then((data)=>{
                res.render("../view/getRole", {                         //profile
                    "data": data,
                    "userId":req.query._id
                });
            }).catch((err)=>{
                res.status(404).redirect('/logout');
            });
        }).catch((err)=>{
            res.status(404).redirect('/logout');
        });    
    }else{
        res.cookie('token', '')
        res.redirect('/logout');       
    }
}