const http = require('http');
const expressApp = require('./expressApp');
const serverConfig = require('./serverConfig');
const initFakeDb = require('./database/fakeDb');
const { createAdminAccount } = require('./database/user');

const server = http.createServer(expressApp);

const initializeServer = async function () {
    await initFakeDb();
    await createAdminAccount();

    server.listen(serverConfig.port, function () {
        console.log(`Server run on: ${serverConfig.url}`);
    });
};

initializeServer();
