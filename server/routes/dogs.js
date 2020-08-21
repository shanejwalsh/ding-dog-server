const express = require('express');

const router = express.Router();
const Dog = require('../../models/dog');

const getDog = async (req, res, next) => {
    let dog;
    try {
        dog = await Dog.findById(req.params.id);

        if (dog == null) {
            return req.status(404).json({ message: 'doggie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.dog = dog;
    return next();
};

router.get('/', async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.status(200).json(dogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getDog, async (req, res) => {
    res.json(res.dog);
});

router.post('/', async (req, res) => {
    const {
        name, imgSrc, breed, location,
    } = req.body.dogData;
    const dog = new Dog({
        name,
        imgSrc,
        breed,
        location,
    });

    try {
        const newDog = await dog.save();
        res.status(201).json(newDog);
    } catch (error) {
        res.status(400).json({ error: res.message });
    }
});

router.patch('/:id', (req, res) => {

});

router.delete('/:id', getDog, async (req, res) => {
    try {
        await res.dog.remove();
        res.json({ message: 'dog removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
