const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');
const dogsRouter = require('./src/routes/availableDogs');

require('dotenv').config();

console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'development');

const atlasDB = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/dogs' : process.env.ATLAS_URI;

mongoose.connect(atlasDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('db connected'));

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/.netlify/functions/index', dogsRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports.handler = serverless(app);
