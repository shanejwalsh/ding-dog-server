const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
    },
    addedAt: {
        type: Date,
    },
});

module.exports = mongoose.model('Dog', dogSchema);
