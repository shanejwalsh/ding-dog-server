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
    imageSrc: {
        type: String,
    },

});

module.exports = mongoose.model('Dog', dogSchema);
