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
            res.redirect('/');
        }
    } else {
        res.cookie('token', '')
        res.redirect('/');
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
                    res.status(404).redirect('/');
                }
            });
        }
        else{
            res.status(404).redirect('/');
        }
    }else{
        res.cookie('token', '')
        res.redirect('/');
    }
}