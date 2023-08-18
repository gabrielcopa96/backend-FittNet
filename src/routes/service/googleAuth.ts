import { Router } from 'express';

import { googleSignIn, getUserGoogleAccount } from '../../controlers/users';

const router = Router();

router.post('/google/auth', googleSignIn);
router.post('/google/auth/profile', getUserGoogleAccount);

export default router;