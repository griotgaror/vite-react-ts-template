const initFakeDb = require('../../database/fakeDb');
const { findInArray } = require('../../utils/helperUtils');
const sendResponse = require('../../utils/httpResponseUtils');

const routeHandler = async function (req, res) {
    try {
        const fakeDb = await initFakeDb();
        const { session } = fakeDb;

        if (!session) return sendResponse.unauthorized(res);

        const accountData = session;
        const roleData = findInArray(fakeDb.roles, 'id', session.role);
        accountData.role = roleData;

        return sendResponse.success(res, accountData);
    } catch (error) {
        return sendResponse.serverError(res, 'Account data could not be retrieved');
    }
};

module.exports = {
    method: 'get',
    path: `/view-account-data`,
    handler: routeHandler,
    params: [],
    responses: {},
};
