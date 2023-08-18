import { Router } from 'express';
import routeLogin from './login';
import routeLogout from './logout';
import routeRegister from './register';
import routeResetPassword from './updatePass';
import routeActivation from './activation';
import routerEmailValidate from './emailValidate';
import routerGoogleAuth from './googleAuth';
import routerPlans from './plans';
import routerMarketing from './marketing';
import routeEmails from './emails';
import routeMercadopago from '../service/mercadopago';

const router = Router();

router.use('/', routeLogin); //ruta /api/service/login get y post
router.use('/', routeLogout); //ruta /api/service/logout post
router.use('/', routeRegister); //ruta /api/service/register get y post (creacion de usuario)
router.use('/', routeResetPassword); //ruta /api/service/updatepassword post
router.use('/', routeActivation); //ruta /api/service/activation//:userId/:secretToken get y /api/service/deleteuseraccount put (solo desactiva la cuenta)
router.use('/', routerEmailValidate) //ruta /api/service/logout post
router.use('/', routerGoogleAuth) //ruta /api/service/google/auth post
router.use('/plans', routerPlans) //ruta /api/service/plans get, post, put, para ver, crear y editar los planes de partner
router.use('/', routerMarketing) //ruta /api/service/
router.use('/', routeEmails); //ruta /api/service/emails --> para enviar correos
router.use('/mercadopago', routeMercadopago) //ruta api/service/mercadopago --> para MP


router.get('/', async (req: any, res: any) => {
    try {
        res.status(200).send("Ruta api/service")
    } catch (error) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        res.status(error.status).json({error: error.message})
    }
});

export default router;