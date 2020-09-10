const { getDogsFromAllPages } = require('./src/scraper');

const {
    postDogToAPI,
    getAllDogsFromAPI,
    deleteAllDogsFromAPI,
} = require('./network/API');

const newDogNumber = dogCollections => {
    const result = dogCollections[0].length - dogCollections[1].dogs.length;
    const single = result === 1;
    if (result < 0 || isNaN(result)) {
        return console.log('something went wrong.');
    }

    return console.log(
        `There ${single ? 'is' : 'are'} ${result} new very good boy${single ? '' : 's'}!!!`
    );
};

const inititalRequest = async () => {
    const allStoredDogs = await getAllDogsFromAPI();
    const allDogsOnWeb = await getDogsFromAllPages();

    return Promise.all([allDogsOnWeb, allStoredDogs]);
};

const init = async () => {
    const dogs = await inititalRequest();
    newDogNumber(dogs);
    postDogToAPI(dogs[0]);
    // deleteAllDogsFromAPI();
};

init();
