const database = {
    "roles_db": require('../models/user-roles'),
    "fresher_questions_db": require('../models/fresher-Questions'),         // create with "<Role Value>_questions_db" template for different role questions
    "fresher_details_db": require('../models/fresher-model'),
    "userprofiles_db": require('../models/user-model')
}

module.exports=database;