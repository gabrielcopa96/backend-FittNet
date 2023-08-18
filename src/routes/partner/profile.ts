import { Router } from 'express';

import { getPartner, putPartner, getAllPartners } from "../../controllers/partners";
import { deleteUser } from '../../controllers/users';

const router = Router();

router.get("/all", getAllPartners);
router.get("/:id", getPartner);
router.put("/edit/:id", putPartner);

//---- CUIDADO OJO ---- ruta para borrar usuarios

router.delete("/delete/:id", async (req: any, res: any, next: any) => {
  const { id } = req.params;
  const response = deleteUser(id);
  console.log(response);
  res.send(response);
});

export default router;