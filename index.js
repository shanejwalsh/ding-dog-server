// eslint-disable-next-line no-console
const {
    postDogToAPI,
    getAllDogsFromAPI,
} = require('./network/API');

const getDogsFromAllPages = require('./src/scraper');

const newDogNumber = dogCollections => {
    if (!dogCollections || !dogCollections.length) {
        return console.log('something went wrong.');
    }

    const [scrapedDogs, dogsFromApi] = dogCollections;

    return console.log(`Dogs in Api: ${(dogsFromApi.dogs || []).length}, Dogs on website: ${scrapedDogs.length}`);
};

const inititalRequest = async () => {
    const allDogsOnWeb = await getDogsFromAllPages();
    const allStoredDogs = await getAllDogsFromAPI();

    return Promise.all([allDogsOnWeb, allStoredDogs]);
};

const init = async () => {
    const dogs = await inititalRequest();
    newDogNumber(dogs);
    postDogToAPI(dogs[0]);
};

init();
