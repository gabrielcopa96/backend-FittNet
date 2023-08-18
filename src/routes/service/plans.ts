import { Router } from "express";
import { getPlans, postPlans, putPlans } from '../../controlers/plans';

const router = Router();

router.get('/all', getPlans); //ruta /api/service/plans/all responde con un json con todos los planes
router.post('/create', postPlans); // ruta /api/service/plans/create se envia por body la info del plan que se quiera crear
router.put('/edit/:id', putPlans); // ruta /api/service/plans/edit/:id se envia por params el id y por body un json con los cambios al plan

export default router;
