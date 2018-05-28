const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userRoleSchema = new Schema(
    {
        question: String,
        image_url: String,
        type: String,
        id: String,
        options: { 
            type : Array , 
            default : [] 
        }
    }
);

var userRoles =  mongoose.model("user_roles",userRoleSchema);

module.exports = userRoles ;