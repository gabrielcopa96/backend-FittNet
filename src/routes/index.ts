import { Router } from 'express';

import routeUser from './user/index';
import routeService from './service/index';
import routePartner from './partner/index';
import routeAdmin from './admin/index';
import routeShopCart from './user/shopCart';
import routeStripe from './user/stripe';
import routerUser1 from './user';

const router = Router();

router.get('/', async (req: any, res: any) => {
    try {
        res.status(200).send("Esta es la api Fittnet")
    } catch (error: any) {
        res.status(error.status).json({error: error.message})
    }
});

router.use('/api/user', routeUser);
router.use('/api/service', routeService);
router.use('/api/partner', routePartner);
router.use('/api/admin', routeAdmin);
router.use('/api/shopcart', routeShopCart);
router.use('/api/checkout', routeStripe);
router.use("/google", routerUser1); 


export default router;
