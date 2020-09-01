require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dogsRouter = require('./routes/dogs');

const app = express();

mongoose.connect(process.env.DB_URL, {
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
