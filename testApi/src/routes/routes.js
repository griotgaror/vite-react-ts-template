const express = require('express');
const fs = require('fs');
const path = require('path');
const serverConfig = require('../serverConfig');

const router = express.Router();

const loadRoutes = function (dir) {
    if (dir === undefined) throw new Error('dir is undefined');
    const routes = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            routes.push(...loadRoutes(filePath));
            continue;
        }

        if (!file.endsWith('.route.js')) continue;

        const route = require(filePath);

        if (!route.method || !route.path || !route.handler) {
            throw new Error(`Invalid Route definition in ${filePath}`);
        }

        router[route.method](route.path, route.handler);
        routes.push(route);
    }

    return routes;
};

const routes = loadRoutes(__dirname);

const addRoutesToServer = function (server) {
    server.use(serverConfig.apiUrl, router);
};

module.exports = {
    addRoutesToServer,
    routes,
};
