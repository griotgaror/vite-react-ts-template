const crypto = require('crypto');

const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromArray = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
};

const getRandomId = () => crypto.randomUUID();

const findInArray = function (arr = [], key = '', value = '') {
    return arr.find((obj) => obj[key] === value);
};

const filterFromArray = function (arr, key, value) {
    if (!Array.isArray(arr)) return [];
    if (typeof key !== 'string') return [];
    if (typeof value !== 'string') return [];

    return arr.filter((obj) => {
        if (!obj || typeof obj !== 'object') return false;
        if (typeof obj[key] !== 'string') return false;
        return obj[key].toLowerCase().startsWith(value.toLowerCase());
    });
};

module.exports = {
    getRandomFromArray,
    getRandomId,
    findInArray,
    filterFromArray,
};
