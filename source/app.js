"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        /**
         * GET /ontology/:type
         *
         */
        router.get('/ontology/:type', (request, response) => {
            response.json({ type: request.params.type });
        });
        this.express.use('/api', router);
    }
}
exports.default = new App().express;
