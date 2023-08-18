import { Router } from 'express';

const router = Router();



// Esta ruta sirve para desloguear un usuario
// Cuando el usuario se deslogua, se limpian los datos de su sesión, y es
// por ahora redirigido a / dónde recibirá un mensaje como respuesta.
export function isAuthenticated(req: any, res: any, next: any) {

  console.log(req.session, 'si--- esto es req.session register isAuthenticated');
  console.log(req.user, 'si--- esto es req.user register isAuthenticated');
  console.log(req.cookies, 'no--- esto es req.cookies register isAuthenticated');
  console.log(req.signedCookies, 'si--- esto es req.signedCookies register isAuthenticated');
  // El browser no me trajo nada, solo un resto de cookie
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/service/logout');
  }
}
router.get('/logout', function (req: any, res: any) {
  res.send('Necesita iniciar sesión para poder hacer un post a logout')
})

router.post('/logout', isAuthenticated,
  function (req: any, res: any) {
    req.logout();
    res.redirect('/');
  }
);

export default router;