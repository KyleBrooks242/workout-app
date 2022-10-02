const { DBUSER, DBPASS } = process.env;
const nano = require('nano')(`http://${DBUSER}:${DBPASS}@127.0.0.1:5984`);
const db = nano.use('workout_app');

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


module.exports = {
    createUser,
    getUser,
    userExists
};