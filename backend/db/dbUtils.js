const { DBUSER, DBPASS } = process.env;
const nano = require('nano')(`http://${DBUSER}:${DBPASS}@127.0.0.1:5984`);
const db = nano.use('workout_app');

const indexDef = {
    index: { fields: ['_id'] },
    name: '_id_index'
};

db.createIndex(indexDef);

/**
 *
 * @param user
 * @returns {Promise<boolean>}
 */
const userExists = async (user) => {
    try {
        await getUser(user);
        return true;
    }
    catch {
        return false;
    }
}

/**
 *
 * @param userName
 * @param email
 * @param firstName
 * @param lastName
 * @param password
 * @returns {Promise<nano.DocumentInsertResponse>}
 */
const createUser = async (userName, email, firstName, lastName, password) => {
    //TODO ADD STANDARD SET OF FIELDS (CREATED AT, UPDATED AT)
    console.log('Creating user...');
    const response = await db.insert({
        _id: userName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        docType: 'USER'
    });

    return response;
}

/**
 *
 * Fetches a user document given the provided user
 * @param user
 * @returns {Promise<nano.DocumentGetResponse>}
 */
const getUser = async (user) => {
    console.log(`Fetching password for user ${user}`);
    return await db.get(user);
}

const addExercise = async (userName, exercise) => {
    //TODO ADD STANDARD SET OF FIELDS (CREATED AT, UPDATED AT)
    console.log('Inserting exercise...');
    const response = await db.insert({
        _id: exercise,
        userName: userName,
        docType: 'EXERCISE_OPTION'
    });

    return response;
}

const getExercisesByUser = async (userName) => {

    const query = {
        selector: {
            docType: { "$eq": "EXERCISE_OPTION"},
            userName: { "$eq": userName },
            _id: { "$ne": null }
        },
        fields: [ "_id" ],
        sort: [{"_id": "asc"}],
        limit: 100
    };
    console.log(`Fetching exercises for user ${userName}`);
    return await db.find(query);
}


module.exports = {
    createUser,
    getUser,
    userExists,
    getExercisesByUser,
    addExercise
};