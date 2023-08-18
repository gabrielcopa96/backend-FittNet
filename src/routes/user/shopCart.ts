import { Router } from 'express';
import { getShopCart, postCart, updateCart} from '../../controllers/ShopCart';

const router = Router();

router.get('/', getShopCart)
router.post('/', postCart)
router.put('/', updateCart)

export default router;