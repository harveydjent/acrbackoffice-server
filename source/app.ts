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
         *
         */
        router.get('/ontology/:type', (request: Request, response: Response) => {
            response.json({ type: request.params.type })
        });

        this.express.use('/api', router);
    }
}

export default new App().express;

