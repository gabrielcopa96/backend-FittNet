import { Router } from "express"; 
import { getUser, deleteUser, updateUser } from "../../controllers/users";
import { updateFavGym } from "../../controllers/gyms";

const router = Router();

router.get("/:id", getUser);
router.put('/update/:id', updateUser);
router.put(`/update/favourite/:id`, updateFavGym)

//---- CUIDADO OJO ---- ruta para borrar usuarios

router.delete("/delete/:id", async (req: any, res: any, next: any) => {
  const { id } = req.params;
  const response = deleteUser(id);
  console.log(response);
  res.send(response);
});

export default router;
