const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var fresherDetailsSchema = new Schema(
    {
        user_id : {
            type: String
        },
        questions_Array : {
            type:Array
        }
    });

var fresherDetail = mongoose.model("fresherDetail",fresherDetailsSchema);

module.exports = fresherDetail;