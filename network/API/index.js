/* eslint-disable no-console */
const fetch = require('node-fetch');

const URL = 'https://ding-dog-api.netlify.app/.netlify/functions/index/dogs';

// const URL = 'http://localhost:9000/.netlify/functions/index/dogs';

const getAllDogsFromAPI = async () => {
    const resp = await fetch(URL);
    const dogs = await resp.json();

    return dogs;
};

const postDogToAPI = async (dogData = {}) => {
    try {
        const resp = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dogData }),
        });

        const dog = await resp.json();

        return dog;
    } catch (error) {
        return console.error(error);
    }
};

const deleteAllDogsFromAPI = async () => {
    const user = { user: 'shane', password: 'password' };
    try {
        const resp = await fetch(URL, {
            method: 'DELETE',
            body: JSON.stringify({ user }),
        });

        const result = await resp.json();

        return result;
    } catch (error) {
        return console.error(error);
    }
};

module.exports = {
    getAllDogsFromAPI,
    postDogToAPI,
    deleteAllDogsFromAPI,
};
