import { Router } from 'express';

import { createAvatar, getAvatar, updateAvatarForUser } from '../../controlers/avatar.controllers';

const router = Router();

router.post('/', createAvatar); //crea un nuevo avatar
router.get('/', getAvatar); //trae todos los avatares creados de la db
router.put('/:id', updateAvatarForUser); //edita la informacion de un avatar

export default router;