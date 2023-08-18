import { Router } from "express";
import routerAvatar from "./avatar";
import routerProfile from "./profile";
import routerAll from './all';

const router = Router();

router.use("/avatar", routerAvatar); 
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
