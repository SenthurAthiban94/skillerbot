const express = require("express");
const route = express.Router();
const auth = require("../controller/auth");
const login = require("../controller/login");
const profile = require("../controller/profile");
const chat = require("../controller/chat");
const passport = require("passport");
const database=require('../config/database');
const userProfile =database.userprofiles_db;                    // require('../models/user-model');
const fresherQuestion = database.fresher_questions_db;          // require('../models/fresher-Questions');
const fresherProfile = database.fresherdetails_db;              // require('../models/fresher-model');
const userRoles=database.roles_db;                              // require('../models/user-roles');
const sendMail=require('../config/nodemailer');


route.get('/', (req, res) => {
    if(!req.session.token || !req.session.hashid){
        res.render("../view/index");
    }else{
        res.redirect('/auth/google/profile/?_id='+req.session.hashid);
    }
});

route.get('/view/success', (req, res) => {
    if(req.query.uid && req.query.url){
        res.render("../view/success",{
            url: req.query.url,
            userid: req.query.id
        });
    }else{
        res.render("../view/signup");
    }
});

route.get('/profile/questions/:profileId/:role',profile.questions);
route.get('/profileHome/:profileId',profile.home);

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

//Get Questions
// route.post('/profile/getQuestions', (req, res) => {
//     var questions = [],userResponse=[],userid,intentCollection,submitted_status,responseObject = {};
//         if(req.body.Role && typeof(req.body.is_submitted)!== "undefined"){
//             submitted_status=req.body.is_submitted;
//         }else{
//             res.status(404).send('Invalid Request');    
//         }
        
//         if(!submitted_status==="false" && !submitted_status==="true"){
//             res.status(404).send('Invalid Request');
//         }
        
//         switch (req.body.Role) {
//             case "fresher":
//                 intentCollection = fresherQuestion;
//                 break;
//             case "Front-End developer":
//                 break;
//             default:
//                 break;
//         }
//         if(submitted_status==="false"){
//             userProfile.findOneAndUpdate({ '_id': req.body.id }, { 'role': req.body.Role }).catch((err) => {
//                 res.render("../view/signup");
//             });
//             if (typeof(intentCollection)=="function") {
//                 intentCollection.findOne({}).then((docs) => {
//                     for (var key_val in docs.questions_Array[0]) {
//                         questions = docs.questions_Array[0];
//                     }
//                     res.json({
//                         questions: questions,
//                         userid: req.body.id
//                     });
//                 })
//             }else{
//                 res.status(404).send('Not found');
//             }
//         }
        
//         if(submitted_status==="true"){
//             userProfile.findOne({ '_id': req.body.id }, (err, user) => {
//                 if (!err) {
//                     if (typeof(intentCollection)=="function") {
//                         intentCollection.findOne({}, function (err, docs) {
//                             if (!err) {
//                                 var counter = 0;
//                                 userResponse = JSON.parse(req.body.question_response);
//                                 for (var key_val in docs.questions_Array[0]) {
//                                     responseObject[key_val] = userResponse[counter];
//                                     counter = counter + 1;
//                                 }

//                                 fresherProfile.findOne({ user_id: req.body.id }).then((currentUser) => {
//                                     var responseObject_arr = [];
//                                     responseObject_arr.push(responseObject);
//                                     if (currentUser) {
//                                         currentUser.questions_Array = responseObject;
//                                         currentUser.save();
//                                     }
//                                     else {
//                                         new fresherProfile({
//                                             user_id: req.body.id,
//                                             questions_Array: responseObject_arr
//                                         }).save();
//                                     }
//                                     var text = "";
//                                     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//                                     for (var i = 0; i < 8; i++)
//                                         text += possible.charAt(Math.floor(Math.random() * possible.length));

//                                     userProfile.findOneAndUpdate({ '_id': req.body.id }, { 'account_status': true, 'url_code': text }, (err, doc) => {
//                                         if (err) {
//                                             res.json({redirect_url:"/view/signup"});
//                                             return;
//                                         }
//                                         res.json({redirect_url:"/view/success",render_data:{
//                                             url: text,
//                                             userid: req.body.id
//                                         }});
//                                     });
//                                 });
//                             }
//                         });
//                     }else{
//                         res.status(404).send('Not found');
//                     }
//                 }
//                 else{
//                     res.json({redirect_url:"../view/signup"});
//                 }
//             });
//         }

// });

module.exports = route;