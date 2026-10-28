const initFakeDb = require('../../database/fakeDb');
const { findInArray } = require('../../utils/helperUtils');
const sendResponse = require('../../utils/httpResponseUtils');

const routeHandler = async function (req, res) {
    try {
        const loginData = req.body;

        const fakeDb = await initFakeDb();
        const user = findInArray(fakeDb.accounts, 'name', loginData.name);

        if (!user) {
            return sendResponse.notFound(res, 'This account does not exist');
        }

        if (loginData.password != user.password) {
            return sendResponse.conflict(res, 'Your account could not be logged in');
        }

        fakeDb.session = user;
        return sendResponse.noContent(res);
    } catch (error) {
        return sendResponse.serverError(res, 'This account could not be logged in');
    }
};

module.exports = {
    method: 'post',
    path: `/sign-in`,
    handler: routeHandler,
    params: [],
    reqBodySchema: {
        type: 'object',
        required: ['name', 'password'],
        properties: {
            name: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
        },
    },
    responses: {},
};
