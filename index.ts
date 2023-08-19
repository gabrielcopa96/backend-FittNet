import { conn } from './src/app/database/db';
import { express_init, passport_init, routes_init } from './src/app/init';


(async () => {
  try {
    
    await conn;
    console.log("connection database");
    /* ------------ INIT EXPRESS ------------ */
    express_init.ExpressInit();
    /* ------------ INIT ROUTES ------------- */
    routes_init();
    /* ------------ INIT PASSPORT ----------- */
    passport_init();

  } catch (error: any) {

    console.log("not connection");
    
  }
})();