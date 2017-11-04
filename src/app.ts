import * as express from 'express'
import { Request, Response, } from 'express'
import CouponRepository from './database/repositories/CouponRepository'
import clientProvider from './database/clientProvider'
import * as config from './config.json'

class App {
    public express;

    private coupons: CouponRepository;

    constructor() {
        this.express = express();
        this.mountRoutes();

        this.coupons = new CouponRepository(clientProvider((<any>config).database))
    }

    private mountRoutes(): void {
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

        /**
         * Return all coupons
         * GET /coupon
         */
        router.get('/coupon', (request: Request, response: Response) => {
            this.coupons.getAll().then(coupons => response.json(coupons));
        });

        /**
         * Return :id coupon
         * GET /coupon/:id
         */
        router.get('/coupon/:id', (request: Request, response: Response) => {
            this.coupons.get(request.params.id).then(coupon => response.json(coupon));
        });

        this.express.use('/api', router);
    }
}

export default new App().express;

