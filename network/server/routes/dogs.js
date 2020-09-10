const express = require('express');

const router = express.Router();
const Dog = require('../../../models/dog');

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
        const dogResults = await Dog.find();
        res.status(200).json({ dogs: dogResults });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getDog, async (req, res) => {
    res.json(res.dog);
});

router.post('/', async (req, res) => {
    const dogs = req.body.dogData;

    try {
        dogs.forEach(async dog => {
            const {
                name,
                imgSrc,
                breed,
                location,
            } = dog;

            const existingDog = await Dog.findOne({ name, breed });
            if (!existingDog) {
                const newDogObj = new Dog({
                    name,
                    imgSrc,
                    breed,
                    location,
                    addedAt: new Date(),
                });

                const savedDog = await newDogObj.save();
            }
        });
        res.json({ dogs });
    } catch (error) {
        res.status(400).json({ error: res.message });
    }
});

router.delete('/:id', getDog, async (req, res) => {
    try {
        await res.dog.remove();
        res.json({ message: 'dog removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        //TODO should probably add some actual auth
        if (req.body.user !== 'shane' || req.body.password !== 'password') {
            return res.status(401).json({ error: 'not authorised' });
        }
        await Dog.deleteMany();
        const dogs = await Dog.find();

        return res.status(200).json(dogs);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
