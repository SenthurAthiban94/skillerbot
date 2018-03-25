const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var  fresherQuestionsSchema = new Schema(
    {
        questions_Array : {
            type:Array
        }
    });

var fresherQuestion = mongoose.model("fresherQuestion",fresherQuestionsSchema);

module.exports = fresherQuestion;