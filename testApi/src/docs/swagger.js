const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const serverConfig = require('../serverConfig');

const createSwaggerPath = function (route) {
    const path = route.path.replace(/\/:.*?\?/g, '');

    const routeData = {
        summary: route.description || 'Description',
        parameters: [],
        responses: route.responses || {},
    };

    // if (route.method === 'post') {
    //     Object.assign(routeData.responses, {
    //         204: {
    //             description: 'No Content',
    //         },
    //     });
    // }

    if (route.reqBodySchema) {
        routeData.requestBody = {
            require: true,
            content: {
                'application/json': {
                    schema: route.reqBodySchema,
                },
            },
        };
    }

    return {
        [path]: {
            [route.method]: routeData,
        },
    };
};

const generateSwaggerPaths = function (routes) {
    const swaggerPaths = {};
    routes.map((route) => Object.assign(swaggerPaths, createSwaggerPath(route)));
    return swaggerPaths;
};

const generateSwaggerSpecOpt = function (swaggerPaths) {
    return {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'TestApi Docs',
                version: '1.0.0',
                description: '',
            },
            servers: [
                {
                    url: `${serverConfig.url}${serverConfig.apiUrl}`,
                },
            ],
            paths: swaggerPaths,
        },
        apis: [],
    };
};

const addSwaggerDocs = function (app, routes) {
    const swaggerPaths = generateSwaggerPaths(routes);
    const swaggerSpecOpt = generateSwaggerSpecOpt(swaggerPaths);
    const swaggerDoc = swaggerJSDoc(swaggerSpecOpt);

    const swaggerUiOpt = {
        customSiteTitle: 'TestApi Docs',
        customCss: `${serverConfig.docsUrl}/themes/darkMonokai.css`,
    };

    app.use(serverConfig.docsUrl, express.static(__dirname));
    app.use(
        serverConfig.docsUrl,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDoc, swaggerUiOpt),
    );
};

module.exports = {
    addSwaggerDocs,
};
