const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');
const dogsRouter = require('./routes/availableDogs');

// const atlasDB = 'mongodb://localhost/dogs';

const atlasDB = 'mongodb+srv://shanejwalsh:nT0zUSOCmSlUfzG8@myfirstcluster.kv7fp.mongodb.net/DogsTrustAPI?retryWrites=true&w=majority';

mongoose.connect(atlasDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('db connected'));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/.netlify/functions/index', dogsRouter);

// eslint-disable-next-line no-console
app.listen(8000, () => console.log('server started on port 8000'));

module.exports.handler = serverless(app);
