const Dog = require('../models/dog');

require('dotenv').config();

const index = async (req, res) => {
    try {
        const dogResults = await Dog.find();
        res.status(200).json({ dogs: dogResults });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const show = async (req, res) => res.json(res.dog);

const create = async (req, res) => {
    const dogs = req.body.dogData;

    try {
        dogs.forEach(async dog => {
            const {
                name, imgSrc, breed, location,
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
};

const destroy = async (req, res) => {
    try {
        await res.dog.remove();
        res.json({ message: 'dog removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const destroyAll = async (req, res) => {
    try {
        if (
            req.body.user !== process.env.API_USERNAME
            || req.body.password !== process.env.API_KEY
        ) {
            return res.status(401).json({ error: 'not authorised' });
        }
        await Dog.deleteMany();
        const dogs = await Dog.find();

        return res.status(200).json(dogs);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// middlewares

const getDog = async (req, res, next) => {
    let dog;
    const { id } = req.params;
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'invlaid id provided' });
        }

        dog = await Dog.findById(id);

        if (dog === null) {
            return req.status(404).json({ message: 'doggie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.dog = dog;
    return next();
};

module.exports = {
    dogController: {
        index,
        create,
        show,
        destroy,
        destroyAll,
    },
    middlewares: {
        getDog,
    },
};
