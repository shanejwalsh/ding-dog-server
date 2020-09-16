const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dogsRouter = require('./routes/dogs');

const app = express();

// const atlasDB = 'mongodb://localhost/dogs';

const atlasDB = 'mongodb+srv://shanejwalsh:nT0zUSOCmSlUfzG8@myfirstcluster.kv7fp.mongodb.net/DogsTrustAPI?retryWrites=true&w=majority';

mongoose.connect(atlasDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', error => console.log((error)));
// eslint-disable-next-line no-console
db.once('open', () => console.log('db connected'));

app.use(express.json());

app.use('/.netlify/functions/index', dogsRouter);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('server started'));

module.exports.handler = serverless(app);
