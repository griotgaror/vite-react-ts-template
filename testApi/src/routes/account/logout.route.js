const initFakeDb = require('../../database/fakeDb');
const sendResponse = require('../../utils/httpResponseUtils');

const routeHandler = async function (req, res) {
    try {
        const fakeDb = await initFakeDb();

        if (!fakeDb.session) return sendResponse.unauthorized(res);

        fakeDb.session = undefined;
        return sendResponse.success(res, 'You have been successfully logged out');
    } catch (error) {
        return sendResponse.serverError(res, 'This account could not be logged out');
    }
};

module.exports = {
    method: 'post',
    path: `/log-out`,
    handler: routeHandler,
    params: [],
    responses: {},
};
