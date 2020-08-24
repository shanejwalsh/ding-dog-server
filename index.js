const { getDogsFromAllPages } = require('./src/scraper');

const { postDogToAPI } = require('./network/API');

const saveAllDogs = dogs => {
    dogs.forEach(dog => postDogToAPI(dog));
};

const log = dogs => {
    dogs.forEach(dog => console.log(dog));
};

const init = () => {
    const parsedDogs = getDogsFromAllPages();
    log(parsedDogs);
    // saveAllDogs(parsedDogs)
};

init();
