const { DBUSER, DBPASS } = process.env;
const nano = require('nano')(`http://${DBUSER}:${DBPASS}@127.0.0.1:5984`);
const db = nano.use('workout_app');

const createUser = async (userName, password) => {
    console.log('creating user...')
    const response = await db.insert({
        user: userName,
        password: password
    });

    console.log(response);

    return response;
}

module.exports = createUser;