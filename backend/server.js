require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
    createUser,
    getUser,
    userExists,
    getExercisesByUser,
    addExerciseOption,
    upsertWorkout,
    getWorkoutByUser,
    getWorkoutCategoriesByUser,
    addWorkoutCategory,
    getProfilePhotoByUser,
    addProfilePicture
} = require('./db/dbUtils');
const apiErrorHandler = require('./middleware/errors/apiErrorHandler');
const verifyToken = require('./middleware/auth');
const ApiError = require('./middleware/errors/ApiError');

const express = require('express');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * Authenticate a user given a username, password
 */
app.post('/login', async (req, res, next) => {

    try {
        const rawData = req.body.data;
        const username = rawData.username;
        const password = rawData.password;

        const user = await getUser(username);

        bcrypt.compare(password, user.password, (err, result) => {
           if (err || !result) {
               console.log('PASSWORD MISMATCH!')
               next(ApiError.badRequest(`Passwords did not match!`));
               return;
           }
           console.log(result);
           console.log("Passwords matched! Returning token...");

           user.token = jwt.sign(
               { userId: username },
               process.env.JWT_TOKEN_KEY,
               {
                   expiresIn: "2 days"
               }
           );

            res.status(200).json(user);
        });
    }
    catch (error) {
        console.error(`Error logging in!`);
        console.error(error);
        next(ApiError.internal('Something went wrong!'))
    }

});

/**
 * Create a user given a username, password
 */
app.post('/user',async (req, res, next) => {
    try {
        const rawData = req.body.data;

        const username  = rawData.username;
        const password  = rawData.password;
        const email     = rawData.email;
        const firstName = rawData.firstName;
        const lastName  = rawData.lastName;

        const exists = await userExists(username);
        if (exists) {
            console.warn(`User ${username} already exists!`);
            next(ApiError.badRequest('User already exists!'));
            return;
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error('An error occurred hashing the password!');
                console.error(err);
                next(ApiError.internal('Something went wrong- Please try again!'));
            }
            else {
                const user = await createUser(username, email, firstName, lastName, hash);

                user.token = jwt.sign(
                    { userId: username },
                    process.env.JWT_TOKEN_KEY,
                    {
                        expiresIn: "2 days"
                    }
                );

                res.status(201).json(user);
            }
        });
    }
    catch (error) {
        console.log()
        next(error);
    }
});

//For all routes below, we want to check for and verify the JWT before continuing!

app.use(verifyToken);

app.get('/profile-photo', async (req, res, next) => {
    try {
        console.log(`GET /profile-photo hit...`);
        const result = await getProfilePhotoByUser(req.user);
        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in GET /profile-photo`);
        next(ApiError.internal('Something went wrong!'));
    }
})

app.post('/profile-photo', async (req, res, next) => {

    try {
        console.log(`POST /profile-photo hit...`);

        const image = req.body.data;

        const result = await addProfilePicture(req.user, image);
        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in POST /profile-photo`);
        next(ApiError.internal('Something went wrong!'));
    }
})

/**
 * Get a list of exercise options for a given user
 **/
app.get('/exercise-option', async (req, res, next) => {
    try {
        console.log(`GET /exercise-option hit...`);
        const result = await getExercisesByUser(req.user);
        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in GET /exercise-option`);
        next(ApiError.internal('Something went wrong!'));
    }
})

app.post('/workout-category', async (req, res, next) => {

    try {
        console.log(`POST /workout-category hit...`);

        const category = req.body.data;

        const result = await addWorkoutCategory(req.user, category);
        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in POST /exercise-category`);
        next(ApiError.internal('Something went wrong!'));
    }
})

app.get('/workout-category', async (req, res, next) => {
    try {
        console.log(`GET /workout-category hit...`);
        const result = await getWorkoutCategoriesByUser(req.user);
        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in GET /workout-category`);
        next(ApiError.internal('Something went wrong!'))
    }
})

/**
 * Add an exercise
 **/
app.post('/exercise', async (req, res, next) => {
    try {
        console.log(`POST /exercise hit...`);
        const rawData = req.body.data;
        console.log(rawData);

        const username  = req.user
        const exercise  = rawData.newExercise;

        const result = await addExerciseOption(username, exercise);
        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in POST /exercise`);
        next(ApiError.internal('Something went wrong!'));
    }
})

app.put('/workout', async(req, res, next) => {
    try {
        console.log(`PUT /workout hit...`);

        const workout = req.body.data;
        console.log(`Workout...`);
        console.log(workout);
        const result = await upsertWorkout(req.user, workout);

        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in PUT /workout`);
        next(ApiError.internal('Something went wrong!'));
    }

})

app.get('/workout', async(req, res, next) => {
    try {
        console.log(`GET /workout hit...`);

        const result = await getWorkoutByUser(req.user);
        console.log(result.docs);

        res.status(200).json(result);
    }
    catch(error) {
        console.log(`Error in GET /workout`);
        next(ApiError.internal('Something went wrong!'));
    }

})

/**
 * Our custom error handler
 */
app.use(apiErrorHandler);


