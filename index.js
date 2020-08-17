const { getDogsFromAllPages, parsedDogArray } = require('./src/scraper');

const logdog = dogs => {
    dogs.forEach(dog => console.log(dog));
};

const init = () => {
    getDogsFromAllPages();
    logdog(parsedDogArray);
};

init();
