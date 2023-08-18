import { Router } from "express"
import passport from "passport";
import LockAccounts from '../../models/LockAccount';

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/service/login"
  }),
  async function (req: any, res: any) {
    console.log(req.user, ' esto es req.user autenticado');

    // console.log(req.session, " esto es req.session 120");
    // console.log(req.user, ' esto es req.user 121');
    // Voy y veo si no está baneado
    let lockAccount = await LockAccounts.find({ userName: req.user.userName })

    console.log(lockAccount, ' esto es req.user autenticado');

    if (lockAccount.length > 0) { // Si está baneado
      return res.redirect('/api/service/lockedaccount');
    }


    let { _id, name, type, avatar, active, latitude, longitude } = req.user;

    res.json({
      login: true, userId: _id, name, type, avatar,
      active, latitude, longitude
    })

  });

// Si está baneado lo mando para acá y no le nada
router.get('/lockedaccount', (req: any, res: any) => {
  res.send('Su email ha sido bloquedo por el administrador del sitio');
});

router.get('/login', (req: any, res: any) => {
  res.send('Email o contraseña incorrecta');
});


// Middleware para mostrar la sesión actual en cada request
router.use((req: any, res: any, next: any) => {
  // console.log(req.session, ' esto es req.session 120');
  // console.log(req.user, ' esto es req.user 121');
  next();
});

export default router;