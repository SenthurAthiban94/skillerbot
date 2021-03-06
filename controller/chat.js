const database=require("../config/database");
const userProfile =database.userprofiles_db;                // require('../models/user-model');
const fresherDetail = database.fresher_details_db;           // require('../models/fresher-model');
const userRoles = database.roles_db;                        // require('../models/user-roles');

const fresherProjectId = 'newagent-33ad4'; 
var apiai = require('apiai');
var app = apiai("c457e5b1c930462f93c64f4d4b0cf0dc");







exports.startChat = (req, res) => {
    var code = req.params.code
    userProfile.findOne({ 'url_code': code }, (err, data) => {
        if (!err) {
            res.render("../view/chat", { "data": data });
        } else {
            res.send(err);
        }
    });
}

exports.chatIntent = (req, res) => {
    // console.log(req.query.q);

    var request = app.textRequest(req.query.q, {
        sessionId: fresherProjectId
    });
    
    request.on('response', function(response) {
        // console.log(response);
        res.send({ "intent" : response.result.metadata.intentName});
    });
    
    request.on('error', function(error) {
        console.log(error);
        res.send({ "error" : error});
    });
    
    request.end();

}

exports.chatResponse = (req,res) => {
    // console.log(req.query.user_id)

    fresherDetail.findOne({"user_id": req.query.user_id}, (err, data) => {
        if (!err) {
            res.send({ "answer" : data.user_details[0][req.query.q] });
        } else {
            res.send("err");
        }
    });
   
}