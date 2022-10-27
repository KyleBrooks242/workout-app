require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");
const { createUser, getUser, userExists, getExercisesByUser, addExercise} = require('./db/dbUtils');
const apiErrorHandler = require('./errors/apiErrorHandler');
const ApiError = require('./errors/ApiError');

const express = require('express');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));

//TODO parse token on every incoming request
// app.use(tokenParser)


/**
 * Authenticate a user given a username, password
 */
app.post('/login', async (req, res, next) => {

    try {
        console.log(req.body.data);
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
        console.error(`Error in catch of login logic`);
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
                next(ApiError.internal('Error hashing password!'));
            }
            else {
                console.log(`Hashed pw: ${hash}`);
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
        next(error);
    }
});



/**
 * Get a list of exercise options for a given user
 **/
app.get('/exercise-options', async (req, res, next) => {
    const rawToken = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(rawToken, process.env.JWT_TOKEN_KEY)
    console.log('DECODED!')
    console.log(decoded);

    const result = await getExercisesByUser(decoded.userId);
    res.status(200).json(result);
})

/**
 * Add an exercise
 **/
app.post('/exercise', async (req, res, next) => {
    //TODO get userName from.. where? client passes it in and we verify the JWT?
    const rawData = req.body.data;
    console.log(rawData);

    const username  = 'testUser';
    const exercise  = rawData.newExercise;

    const result = await addExercise(username, exercise);
    res.status(200).json(result);
})

/**
 * For all routes other than the /login or /user route...
 * let's use middleware to authenticate the user's token
 */
app.use((req, res, next) => {
    console.log("Token authentication should come here...");
    console.log(req.path);
    next();
});

/**
 * Our custom error handler
 */
app.use(apiErrorHandler);


