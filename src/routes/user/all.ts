import { Router } from "express";
import run from "../../controllers/test";
import DiseasesType from '../../models/DiseasesType';
import { findAllUsers } from "../../controllers/users";

const router = Router();


router.get("/", async (req: any, res: any) => {
    console.log('si llega a la ruta')
    try {
        const response = await findAllUsers();
        res.status(200).send(response)
    } catch (error: any) {
        res.status(error.status).send({ msg: error.message })
    }
});



router.get("/deleteDesease/:id", async (req: any, res: any) => {
    console.log('si llega a la ruta')
    try {
        const response = await run();
        console.log(response);
        res.status(200).send(response);
    } catch (error: any) {
        res.status(error.status).send({ msg: error.message });
    }

});

router.get("/findDeseaseType/", async (req: any, res: any) => {
    try {
        const types = await DiseasesType.find()
        res.status(200).send(types);
    } catch (error: any) {
        res.status(error.status).send({ msg: error.message });
    }

})

router.get("/createDeseaseType/", async (req: any, res: any) => {
    console.log('si llega a la ruta')
    try {
        const response = await run();
        console.log(response);
        res.status(200).send(response);
    } catch (error: any) {
        res.status(error.status).send({ msg: error.message });
    }

});

router.get("/deseases/", async (req: any, res: any) => {
    try {
        res.status(200).send("desease created")
    } catch (error: any) {
        res.status(error.status).send({ msg: error.message })
    }

})

router.get("/deseasesMap", async (req: any, res: any) => {
    try {
        const resp = await DiseasesType.find()
        // const deseasesTypes = resp.map(e => e.deseaseName)
        //const desases= new Set(desease)
        res.status(200).send(resp)
    } catch (error: any) {
        res.status(error.status).send({ msg: error.message })
    }

})

export default router;

