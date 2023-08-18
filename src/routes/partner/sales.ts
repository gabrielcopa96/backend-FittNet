import { Router } from "express";

import { getPartnerSales, getAdminSales } from "../../controllers/salesFilters";

const router = Router();

//----------------------------------------------------------------------------
// Envia todas las ventas con status Payed del partner
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/sales/:id

router.get('/:id', async (req: any, res: any) => { 
    try {
        const { id } = req.params;
        console.log(id, "el id desde la ruta")
        const response = await getPartnerSales(id);      
        res.status(200).send(response);
    } catch (error) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        res.status(404).send({ error: error.message });
    }
});

//----------------------------------------------------------------------------
// Envia todas las ventas con status Payed de todos los partner
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/sales/:id
  
router.get('/allsales/:id', async (req: any, res: any) => { 
    try {
        const { id } = req.params;
        const response = await getAdminSales(id);      
        res.status(200).send(response);
    } catch (error) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        res.status(404).send({ error: error.message });
    }
});

export default router;