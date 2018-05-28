const userProfile = require('../models/user-model');

exports.home = (req, res) => {
    var code = req.params.profileId;
    userProfile.findOne({ '_id': code }, (err, data) => {
        if (!err) {
            res.render("../view/profileHome", { "data": data });
        } else {
            res.status(404).redirect('/auth/google');
        }
    });
}