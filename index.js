const { getDogsFromAllPages, parsedDogArray } = require('./src/scraper');

const { postDogToAPI  } = require('./API');

const saveAllDogs = dogs => {
    dogs.forEach(dog => postDogToAPI(dog));
};

const init = () => {
    getDogsFromAllPages();
    saveAllDogs(parsedDogArray);
};

init();
