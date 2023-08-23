import { conn } from './src/configs/database/db';
import { express_init, passport_init, routes_init } from './src/configs/init';


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