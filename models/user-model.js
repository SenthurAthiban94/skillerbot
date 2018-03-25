const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userProfileSchema = new Schema(
    {
        user_name : String,
        email_id : String,
        mobile : String,
        image_path : String,
        account_status : Boolean,
        url_code : String,
        role : String,
        profile_url : String
    }
);

var userProfile =  mongoose.model("userProfile",userProfileSchema);

module.exports = userProfile ;