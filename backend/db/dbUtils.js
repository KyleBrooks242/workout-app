const { DBUSER, DBPASS } = process.env;
const dayjs = require('dayjs');
const nano = require('nano')(`http://${DBUSER}:${DBPASS}@127.0.0.1:5984`);
const db = nano.use('workout_app');

const indexDefId = {
    index: { fields: ['_id'] },
    name: '_id_index'
};

const indexDefDate = {
    index: { fields: ['date'] },
    name: 'date_index'
};

db.createIndex(indexDefId);
db.createIndex(indexDefDate);

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
const createUser = async (user, email, firstName, lastName, password) => {
    //TODO ADD STANDARD SET OF FIELDS (CREATED AT, UPDATED AT)
    console.log('Creating user...');
    const response = await db.insert({
        _id: user,
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

const addExercise = async (user, exercise) => {
    //TODO ADD STANDARD SET OF FIELDS (CREATED AT, UPDATED AT)
    console.log('Inserting exercise...');
    const response = await db.insert({
        _id: `${user}_${exercise}`,
        userName: user,
        exercise: exercise,
        docType: 'EXERCISE_OPTION'
    });

    return response;
}

const getExercisesByUser = async (user) => {

    const query = {
        selector: {
            docType: { "$eq": "EXERCISE_OPTION"},
            userName: { "$eq": user },
            exercise: { "$ne": null }
        },
        fields: [ "exercise" ],
        sort: [{"_id": "asc"}],
        limit: 100
    };
    console.log(`Fetching exercises for user ${user}`);
    const result = await db.find(query);
    return result;
}

//TODO.. we have a scenario where someone working out at midnight may end up with two workouts
// We really need the workout to have a name given to it and associated for the duration
const upsertWorkout = async (user, workout) => {


    const date = dayjs().format('YYYY-MM-DD');
    const id = `${user}_workout_${date}`

    await db.get(id)
        .then(res => {
            return db.insert(
                {
                    _id: id,
                    value: workout,
                    userName: user,
                    date: date,
                    // category: category TODO add categories (chest, legs, etc.) to make it easier to filter later
                    // workoutName: workoutName If we decide to let user give a name their workouts..?
                    docType: 'WORKOUT',
                    _rev: res._rev
                }
            )
        })
        .catch((error) => {
            console.log(error);
            //If we don't find the document, no problem.. insert as new!
            return db.insert(
                {
                    _id: id,
                    value: workout,
                    userName: user,
                    date: date,
                    // category: category TODO add categories (chest, legs, etc.) to make it easier to filter later
                    // workoutName: workoutName If we decide to let user give a name their workouts..?
                    docType: 'WORKOUT'
                }
            )
        })
}

const getWorkoutByUser = async (user) => {
    const query = {
        selector: {
            docType: { "$eq": "WORKOUT"},
            userName: { "$eq": user },
            value: { "$ne": null }
        },
        fields: [ "value", "date" ],
        sort: [{"date": "desc"}],
        limit: 100
    };
    console.log(`Fetching exercises for user ${user}`);
    const result = await db.find(query);
    return result;
}

//TODO helper function that will basically append all info needed to make a unique _id field and ensure consistency
const formatIdValue = () => {

}


module.exports = {
    createUser,
    getUser,
    userExists,
    getExercisesByUser,
    addExercise,
    upsertWorkout,
    getWorkoutByUser
};