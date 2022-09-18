const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/user', (req, res) => {
    const rawData = JSON.parse(req.body.data);

    //Temporary way of testing server functionality
    if (rawData.username === 'jimbo' && rawData.password === 'password') {
        res.send({status: 200, token: 'sampleToken'})
    }
    else {
        throw new Error("Invalid User/Password!");
    }

})

