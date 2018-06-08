const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var fresherDetailsSchema = new Schema(
    {
        user_id : {
            type: String
        },
        user_details : {
            type:Array
        }
    });

var fresherDetail = mongoose.model("fresherDetail",fresherDetailsSchema);

module.exports = fresherDetail;