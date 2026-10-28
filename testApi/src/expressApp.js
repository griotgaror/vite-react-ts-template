const express = require('express');
const path = require('path');
const fs = require('fs');

const serverConfig = require('./serverConfig');
const { addRoutesToServer, routes } = require('./routes/routes');
const { addSwaggerDocs } = require('./docs/swagger');

const app = express();
app.use(express.json());

const clientBuildPath = path.join(__dirname, '../../build');
const indexHtml = path.join(clientBuildPath, 'index.html');

addRoutesToServer(app);
addSwaggerDocs(app, routes);

// Serve static files
app.use(
    serverConfig.baseUrl,
    express.static(clientBuildPath, {
        setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache, must-revalidate'),
    }),
);

// Catch-All Redirect
app.use(function (req, res, next) {
    const isApiRoute = req.path.startsWith(serverConfig.apiUrl);
    const isDocs = req.path.startsWith(serverConfig.docsUrl);
    const isWs = req.headers['upgrade'] === 'websocket';

    if (isApiRoute || isDocs || isWs) return next();

    if (!fs.existsSync(indexHtml)) {
        return res.redirect(serverConfig.docsUrl);
    }

    res.sendFile(indexHtml, (err) => {
        if (err) next(err);
    });
});

module.exports = app;
