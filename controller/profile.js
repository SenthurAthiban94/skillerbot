const database=require('../config/database');

exports.home = (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        if(req.params.profileId){
            database.userprofiles_db.findOne({ '_id': req.params.profileId }, (err, data) => {
                if (!err) {
                    res.render("../view/profileHome", { "data": data });
                } else {
                    res.status(404).redirect('/auth/google');
                }
            });
        }else{
            res.redirect('/logout');
        }
    } else {
        res.cookie('token', '')
        res.redirect('/logout');
    }
}

exports.questions = (req,res)=> {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        if(req.params.profileId && req.params.role){
            database.userprofiles_db.findOne({ '_id': req.params.profileId }).then((currentUser) => {
                if (currentUser) {
                    currentUser.role=req.params.role;
                    currentUser.save().then((updatedUser)=>{
                        var questions = [],intent=req.params.role+"_questions_db";
                        database[intent].findOne({}).then((docs) => {
                            for (var key_val in docs.questions_Array[0]) {
                                questions = docs.questions_Array[0];
                            }
                            res.render("../view/questions", {
                                questions: questions,
                                userdata: currentUser
                            });
                        })
                    });
                }
                else {
                    res.status(404).redirect('/logout');
                }
            });
        }
        else{
            res.status(404).redirect('/logout');
        }
    }else{
        res.cookie('token', '')
        res.redirect('/logout');
    }
}


exports.answers = (req,res)=> {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        let request_body=req.body;     
        if(request_body.id && request_body.role && request_body.questions_response){
            let answers=JSON.parse(request_body.questions_response);
            database.userprofiles_db.findOne({ '_id': request_body.id }, (err, user) => {
                if (!err) {
                    let intent=request_body.role+"_details_db";
                        database[intent].findOne({ user_id: request_body.id }).then((currentUser) => {
                            if (currentUser) {
                                currentUser.user_details = answers;
                                currentUser.save(function (err, updatedUser) {
                                    if(err){
                                        res.json({redirect_url:"/"});
                                    }
                                    res.json({redirect_url:"/view/success"});
                                });
                            }
                            else {
                                let newDataEntry=database[intent];
                                new newDataEntry({
                                    user_id: request_body.id,
                                    user_details: answers
                                }).save(function (err, newUser) {
                                    if(err){
                                        res.json({redirect_url:"/"});
                                    }
                                    var text = "";
                                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                                    for (var i = 0; i < 8; i++)
                                        text += possible.charAt(Math.floor(Math.random() * possible.length));
        
                                    database.userprofiles_db.findOneAndUpdate({ '_id': request_body.id }, { 'account_status': true, 'url_code': text }, (err, doc) => {
                                        if (err) {
                                            res.json({redirect_url:"/"});
                                        }
                                        res.json({redirect_url:"/view/success"});
                                    });
                                });
                            }
                        });
                }
                else{
                    res.json({redirect_url:"/"});
                }
            });
        }
        else{
            res.json({redirect_url:"/"});
        }
    }else{
        res.cookie('token', '');
        res.json({redirect_url:"/"});
    }
}
exports.editanswers=(req,res)=>{
    if(!req.session.token || !req.session.hashid){
        res.redirect("/logout");
    }else{
        database.userprofiles_db.findOne({ '_id': req.session.hashid }).then((currentUser) => {
            if (currentUser) {
                var questions = [],question_intent=currentUser.role+"_questions_db";
                database[question_intent].findOne({}).then((docs) => {
                    for (var key_val in docs.questions_Array[0]) {
                        questions = docs.questions_Array[0];
                    }
                    let answer_intent=currentUser.role+"_details_db";
                        database[answer_intent].findOne({ user_id: currentUser._id }).then((currentUser_details) => {
                            if (currentUser_details) {
                                res.render("../view/questions", {
                                    questions: questions,
                                    userdata: currentUser,
                                    previousdata:currentUser_details.user_details
                                });
                            }else{
                                res.render("../view/questions", {
                                    questions: questions,
                                    userdata: currentUser
                                });
                            }
                        });
                })
            }
            else {
                res.status(404).redirect('/logout');
            }
        });
    }
}

exports.success=(req, res) => {
    if(!req.session.token || !req.session.hashid){
        res.redirect("/logout");
    }else{
        res.cookie('token', req.session.token);
        database.userprofiles_db.findOne({ '_id': req.session.hashid }, (err, user) => {
            if (err) {
                res.redirect("/logout");
            }
            res.render("../view/success",{
                url: user.url_code,
                userid: user._id
            });
        });
    }
}