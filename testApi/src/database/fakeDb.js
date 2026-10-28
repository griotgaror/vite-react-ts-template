const { roles } = require('./roles');

let fakeDb = null;

const initFakeDb = async function () {
    if (fakeDb) return fakeDb;

    fakeDb = {
        session: undefined,
        roles: roles,
        accounts: [],
    };
};

module.exports = initFakeDb;
