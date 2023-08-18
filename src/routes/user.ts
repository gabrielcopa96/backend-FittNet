import { Router } from 'express';
import { googleSignIn, getUser } from '../controlers/users';

const router = Router();

router.post('/google/auth', googleSignIn);

router.get('/user/profile/:id', getUser);

export default router;