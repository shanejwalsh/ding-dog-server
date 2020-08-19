require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dogsRouter = require('./routes/dogs');

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', error => console.log((error)));
db.once('open', () => console.log('db connected'));

app.use(express.json());

app.use('/dogs', dogsRouter);

app.listen(3000, () => console.log('server started'));
