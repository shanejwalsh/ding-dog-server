const HTMLParser = require('node-html-parser');
const { getSourceAsDOM } = require('./dom');

const baseUrl = 'https://www.dogstrust.ie';
const path = '/rehoming/dogs/page/';

const parsedDogArray = [];

const getIndividualDogData = dogCard => {
    const dogData = {};

    if (dogCard && dogCard.querySelector) {
        dogData.name = (dogCard.querySelector('h3').childNodes[0].rawText);
        dogData.breed = (dogCard.querySelector('span').childNodes[0].rawText);
        dogData.imgSrc = (baseUrl + dogCard.querySelector('img').rawAttrs.split(' ').filter(attr => attr.includes('src'))[0].split('=')[1].replace(/"/g, ''));
        dogData.location = (dogCard.querySelectorAll('span')[1].childNodes[0].rawText);
    }

    return dogData;
};

const getDogList = container => {
    if (!container) {
        return;
    }

    const dogArray = container.childNodes;

    dogArray.forEach(dogCard => {
        const dogData = getIndividualDogData(dogCard);

        if (Object.keys(dogData).length) {
            parsedDogArray.push(dogData);
        }
    });
};

const getNumberOfPages = () => {
    const source = getSourceAsDOM(`${baseUrl + path}1`);
    const dom = HTMLParser.parse(source.rawHTML);
    const pages = dom.querySelector('#BodyContent_DogList1_ulPagination');
    return pages.childNodes.length;
};

const getDogsFromPage = pageNumber => {
    const dom = getSourceAsDOM(`${baseUrl + path + pageNumber}`);
    const root = HTMLParser.parse(dom.rawHTML);
    const dogContainer = root.querySelector('section').querySelectorAll('.row')[1];

    getDogList(dogContainer);
};

const getDogsFromAllPages = () => {
    for (let i = 1; i < getNumberOfPages() + 1; i++) {
        getDogsFromPage(i);
    }
};

module.exports = {
    getDogsFromAllPages,
    parsedDogArray,
};
