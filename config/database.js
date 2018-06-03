const database = {
    "roles_db": require('../models/user-roles'),
    "fresher_questions_db": require('../models/fresher-Questions'),         // create with "<Role Value>_questions_db" template for different role questions
    "fresherdetails_db": require('../models/fresher-model'),
    "userprofiles_db": require('../models/user-model')
}

module.exports=database;