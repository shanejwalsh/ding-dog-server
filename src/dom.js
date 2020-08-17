const { XMLHttpRequest } = require('xmlhttprequest');
const DOMParser = require('dom-parser');

const getSourceAsDOM = url => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, false);
    xmlhttp.send();
    const parser = new DOMParser();
    return parser.parseFromString(xmlhttp.responseText, 'text/html');
};

module.exports = {
    getSourceAsDOM,
};
