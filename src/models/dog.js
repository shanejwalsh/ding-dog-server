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
        default: new Date(),
    },
    isAdopted: {
        type: Boolean,
        default: false,
    },
    adoptedAt: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('Dog', dogSchema);
