require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dogsRouter = require('./routes/dogs');

const app = express();

const atlasDB = `mongodb+srv://shanejwalsh:${process.env.ATLAS_PASSWORD}@myfirstcluster.kv7fp.mongodb.net/DogsTrustAPI?retryWrites=true&w=majority`;

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

app.use('/dogs', dogsRouter);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('server started'));
