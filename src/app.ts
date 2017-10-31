import * as express from 'express'
import { Request, Response, } from 'express'

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes():void {
        const router = express.Router();

        /**
         * GET /ontology/:type
         * Retrieve ontology for a given form type
         */
        router.get('/form/:type', (request: Request, response: Response) => {
            response.json({ type: request.params.type })
        });

        /**
         * POST /form/:type
         */
        router.post('/form/:type', (request: Request, response: Response) => {
            response.json({ type: request.params.type });
        });

        this.express.use('/api', router);
    }
}

export default new App().express;

