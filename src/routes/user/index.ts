import { Router } from "express";
import routerProfile from "./profile";
import routerAll from './all';
import { avatar_route } from "../../Avatar";

const router = Router();

router.use("/avatar", avatar_route); 
router.use("/profile", routerProfile);
router.use('/all', routerAll)

router.get("/", async (req: any, res: any) => {
  try {
    res
      .status(200)
      .send(
        "Ruta /api/user"
      );
  } catch (error: any) {
    res.status(error.status).json({ error: error.message });
  }
});

export default router;
