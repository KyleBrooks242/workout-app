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

const addExerciseOption = async (user, exercise) => {
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
    console.log(`Fetching exercises for user ${user}`);

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
    const result = await db.find(query);
    return result;
}

const getWorkoutCategoriesByUser = async (user) => {
    console.log(`Fetching workout categories for user ${user}`);

    const query = {
        selector: {
            docType: { "$eq": "WORKOUT_CATEGORY"},
            userName: { "$eq": user },
            category: { "$ne": null }
        },
        fields: [ "category" ],
        sort: [{"_id": "asc"}],
        limit: 100
    };
    const result = await db.find(query);
    return result;
}

const addWorkoutCategory = async (user, category) => {

    //TODO ADD STANDARD SET OF FIELDS (CREATED AT, UPDATED AT)
    console.log('Inserting workout category...');
    const response = await db.insert({
        _id: `${user}_${category}`,
        userName: user,
        category: category,
        docType: 'WORKOUT_CATEGORY'
    });

    return response;
}

const upsertWorkout = async (user, workout) => {
    const parsedWorkout = JSON.parse(workout);

    const date = dayjs().format('YYYY-MM-DD');
    const id = `${user}_${parsedWorkout.workoutName}_${date}`

    //TODO ADD STANDARD SET OF FIELDS (CREATED AT, UPDATED AT)
    await db.get(id)
        .then(res => {
            return db.insert(
                {
                    _id: id,
                    value: parsedWorkout.exerciseList,
                    workoutName: parsedWorkout.workoutName,
                    userName: user,
                    category: parsedWorkout.category,
                    docType: 'WORKOUT',
                    date: date,
                    _rev: res._rev
                }
            )
        })
        .catch((error) => {
            console.log('Error in catch block of upsert workout!');
            //If we don't find the document, no problem... insert as new!
            if (error.statusCode !== 404) {
                throw new Error('Something went wrong!');
            }
            console.log('Workout does not exist, inserting as new...')
            return db.insert(
                {
                    _id: id,
                    value: parsedWorkout.exerciseList,
                    workoutName: parsedWorkout.workoutName,
                    userName: user,
                    date: date,
                    category: parsedWorkout.category,
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
        fields: [ "value", "date", "workoutName", "category" ],
        sort: [{"date": "desc"}],
        limit: 100
    };
    console.log(`Fetching workouts for user ${user}`);
    const result = await db.find(query);
    return result;
}

module.exports = {
    createUser,
    getUser,
    userExists,
    getExercisesByUser,
    addExerciseOption,
    upsertWorkout,
    getWorkoutByUser,
    getWorkoutCategoriesByUser,
    addWorkoutCategory
};