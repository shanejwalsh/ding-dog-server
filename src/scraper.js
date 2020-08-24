const HTMLParser = require('node-html-parser');
const { getSourceAsDOM } = require('./dom.js');

const baseUrl = 'https://www.dogstrust.ie';
const path = '/rehoming/dogs/page/';

const getDogImgSrc = card => {
    if (!card) {
        return '';
    }

    const exp = new RegExp(/(?<=src=)(["'])((?:(?!\1).)*)\1/);
    const attrs = card.querySelector('img').rawAttrs;

    return (attrs.match(exp)[2]);
};

const getIndividualDogData = dogCard => {
    const dogData = {};

    if (dogCard && dogCard.querySelector) {
        dogData.name = (dogCard.querySelector('h3').childNodes[0].rawText);
        dogData.breed = (dogCard.querySelector('span').childNodes[0].rawText);
        dogData.imgSrc = (baseUrl + getDogImgSrc(dogCard));
        dogData.location = (dogCard.querySelectorAll('span')[1].childNodes[0].rawText);
    }

    return dogData;
};

const getDogList = container => {
    const parsedDogArray = [];

    if (!container) {
        return parsedDogArray;
    }

    const dogArray = container.childNodes;

    dogArray.forEach(dogCard => {
        const dogData = getIndividualDogData(dogCard);

        if (Object.keys(dogData).length) {
            parsedDogArray.push(dogData);
        }
    });

    return parsedDogArray;
};

const getNumberOfPages = () => {
    const source = getSourceAsDOM(`${baseUrl + path}1`);
    const dom = HTMLParser.parse(source.rawHTML);
    const pages = dom.querySelector('#BodyContent_DogList1_ulPagination');
    return pages.childNodes.length;
};

const getDogsFromPage = pageNumber => {
    const url = baseUrl + path + pageNumber;

    const dom = getSourceAsDOM(url);
    const root = HTMLParser.parse(dom.rawHTML);
    const dogContainer = root.querySelector('section').querySelectorAll('.row')[1];

    return getDogList(dogContainer);
};

const getDogsFromAllPages = () => {
    let parsedDogArrayAllPages = [];
    const pages = getNumberOfPages();
    for (let i = 1; i < pages + 1; i++) {
        parsedDogArrayAllPages = parsedDogArrayAllPages.concat(getDogsFromPage(i));
    }

    return parsedDogArrayAllPages;
};

module.exports = {
    getDogsFromAllPages,
};
