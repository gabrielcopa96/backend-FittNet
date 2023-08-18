import { Router } from "express";
import {
  getAllGyms,
  postGyms,
  saveGyms,
  getGymById,
  getGymByName
} from "../../controlers/gyms";

import Gyms from "../../models/Gyms";
import Users from "../../models/User";
import Partner from "../../models/Partner";


const router = Router();

// Para solicitar info de todos los gyms
router.get("/allgyms", async (req: any, res: any) => {
  try {
    const response = await getAllGyms();
    res.status(200).send(response);
  } catch (error: any) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/gymbyid/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const response = await getGymById(id);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(404).send({ error: error.message });
  }
});

// Para solicitar info de un gym con su name
router.get('/gymbyname', async (req: any, res: any) => {
  try {
    const { name } = req.query;
    const response = await getGymByName(name);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(404).send({ error: error.message });
  }
});

// Para actualizar un gym
router.put('/gymupdate', async (req: any, res: any) => {
    try {        
        const { id, data } = req.body
        const response = await saveGyms(id, data);
        res.status(200).send(response);
    } catch (error: any) {
      console.error(error)
        res.status(404).send({ error: error.message });
      }
}); 

// Para crear gym
router.post('/gymcreate/:idUser', async (req: any, res: any) => {
    const { idUser } = req.params;    
    try {
      console.log("llega a la ruta post gymcreate")
        const response = await postGyms(idUser, req.body);
        res.status(200).send(response);
    } catch (error: any) {
        res.status(404).send({ error: error.message });
      }
});


//----------------------------------------------------------------------------
// Trae los gimnasios de un usuario partner
//----------------------------------------------------------------------------
// http:/localhost:3001/api/partner/gyms/mygyms/:userId

router.get("/mygyms/:userId", async (req: any, res: any) => {

  let { userId } = req.params;

  // console.log(userId)

  let partnerId = userId;

  try {
    let infoPartner: any = await Users.findById(partnerId)

    let allGymPartner: any;

    if (infoPartner.partner) {
      let idInfoPartner = infoPartner.partner;

      allGymPartner = await Partner.findById(idInfoPartner)
        .populate({ path: "gyms", populate: { path: "services" } })

    }

    res.status(200).json(allGymPartner);
  } catch (error: any) {
    console.log(error)
    res.status(404).send({ error: error.message });
  }

});


//----------------------------------------------------------------------------
// Para crear un solo gym - envío el id del user y la info para crear el gym
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/gyms/createOneGym

router.post('/createOneGym/', async (req: any, res: any) => {
  console.log(req.body, 'create One Gym 1')

  const { userId, dataNewGym } = req.body;
  let partnerId = userId.userId;
  // console.log(partnerId, 'partener id');
  try {
    let addNewGym;
    
    
    let infoPartner: any = await Users.findById(partnerId)
    console.log(infoPartner, ' info del partner')


    const newGym = new Gyms(dataNewGym);
    await newGym.save();


    if (infoPartner.partner) {
      let idInfoPartner = infoPartner.partner;

      addNewGym = await Partner.findByIdAndUpdate(idInfoPartner,
        { $push: { gyms: newGym._id } },
        { new: true });
      // console.log(addNewGym, 'estoy en el if newGym');
  
    }

    if (addNewGym) {
      return res.status(200).json({ message: 'Gimasio creado' });
    }

  } catch (error: any) {
    console.log(error, 'create One Gym');
    res.status(404).send({ error: error.message });
  }
})

// pasos para crear el gym y vincularlo al user
// 1 crear el gym
// 2 guardarlo
// 3 buscar el partner (userId) y actualizarlo


// 1 - En el modelo User cuando es partner
// partner: {
//   type: Array,
//   of: mongoose.SchemaTypes.ObjectId,
//   ref: "Partner" --------------------> hay una referencia al modelo Partner
// },

// 2 - En el modelo Partner
// gyms: {
//   type: Array,
//   of: mongoose.SchemaTypes.ObjectId,
//   ref: "Gyms", --------------------> hay una referencia al modelo Gyms
// },

// 3 - En el modelo Gym
// services: {
//   type: Array,
//   of: mongoose.SchemaTypes.ObjectId,
//   ref: "Services", ----------------> Hay una referencia al modelo Services
// }, 

// 4 - Y finalmente está services en el último lugar



//----------------------------------------------------------------------------
// Para editar un solo gym - envío el id del gym y la nueva info para editar 
// el gym
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/gyms/editOneGym

router.put('/editOneGym/', async (req: any, res: any) => {
  console.log(req.body, 'edite One Gym')

  const { gymId, newDataGym } = req.body;
  let idGym = gymId.gymId;
  let editeGym;

  console.log(req.body, ' la data del gym a editar')


  try {
    editeGym = await Gyms.findByIdAndUpdate(idGym,
      newDataGym, { new: true })

    console.log(editeGym, 'luego del update')


    res.status(200).json({ message: 'Gimnasio actualizado' });
  } catch (error: any) {
    console.log(error);
    res.status(404).send({ error: error.message });
  }
})


export default router;