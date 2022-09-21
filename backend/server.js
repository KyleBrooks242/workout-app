const createUser = require('./db/dbUtils');

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
app.post('/login', (req, res) => {
    const rawData = JSON.parse(req.body.data);


    if (rawData.username === 'jimbo' && rawData.password === 'password') {
        res.send({userToken: { token: 'sampleToken', expires: 'never' }})
    }
    else {
        throw new Error("Invalid User/Password!");
    }

})

/**
 * Create a user given a username, password
 */
app.post('/user',(req, res) => {
    const rawData = JSON.parse(req.body.data);

    const username = rawData.username;
    const password = rawData.password;

    //TODO need to query the database for a user with the provided username to ensure
    //one does not already exist!
    //if (userAlreadyExists() {
    //
    //}

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.log('something went wrong!')
        }
        else {
            console.log(`Hashed pw: ${hash}`);
            await createUser(username, hash);
        }
    })

    //TODO we need to go ahead and generate a token and return it here
    //Also figure out why we are getting a proxy error for this endpoint
    res.send({success: true})
})

