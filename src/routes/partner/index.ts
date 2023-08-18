import { Router } from "express";
import routerProfile from './profile';
import routerGyms from './gyms';
import routerServices from './services';
import routerSales from "./sales";

const router = Router();

router.use("/gyms", routerGyms);
router.use("/services", routerServices); 
router.use("/profile", routerProfile);
router.use("/sales", routerSales);

router.get("/", async (req: any, res: any) => {
  try {
    res
      .status(200)
      .send(
        "Ruta /api/Partner"
      );
  } catch (error) {
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    res.status(error.status).json({ error: error.message });
  }
});

export default router;