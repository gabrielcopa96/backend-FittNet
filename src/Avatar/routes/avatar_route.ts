import { Router } from 'express';
import { createAvatar, getAvatars, updateAvatarForUser } from '../controllers/avatar_controller';

const router = Router();

router.post('/', createAvatar); //crea un nuevo avatar
router.get('/', getAvatars); //trae todos los avatares creados de la db
router.put('/:id', updateAvatarForUser); //edita la informacion de un avatar

export default router;