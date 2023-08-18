import { Router, Request, Response } from "express";
import Users from '../../models/User';

const router = Router();

router.get("/allusers", async (req: Request, res: Response) => {

  try {
    let pipeline = { $match: { type: "user" } };

    let allUsers = await Users.aggregate([pipeline,
      {
        $project: {
          _id: 1,
          active: 1,
        }
      }]).sort({ name: 'asc', test: -1 });

    // console.log(allUsers, 'todos los user')

    res.json(allUsers);

  } catch (error: any) {
    res.status(error.status).json({ error: error.message });
  }
});

export default router;