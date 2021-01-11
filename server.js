'use strict';
const { request } = require('express');
const app = require('express');
const router = require('./mock-api/endpoints');
const bodyParser = require('body-parser');

server(process.argv[2]);

function server(port = 8080) {
  app()
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(router)
    .listen(port, () => console.log(`Listening on port ${port}`));
}