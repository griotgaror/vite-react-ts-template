const initFakeDb = require('./fakeDb');
const { getRandomId } = require('../utils/helperUtils');
const { ADMIN_ROLE, DEFAULT_ROLE } = require('./roles');

const createNewAccount = async function (data = {}) {
    const { name = 'Username', password, roleId } = data;
    const fakeDb = await initFakeDb();

    const newAccount = {
        id: getRandomId(),
        name,
        password,
        creation_date: new Date().toISOString(),
        profile_image: null,
        role: roleId || DEFAULT_ROLE.id,
    };

    fakeDb.accounts.push(newAccount);

    return newAccount;
};

const createAdminAccount = async function () {
    await createNewAccount({
        name: 'admin',
        password: 'admin',
        roleId: ADMIN_ROLE.id,
    });

    console.log('[INFO] Admin Account successfully created');
};

module.exports = {
    createAdminAccount,
};
