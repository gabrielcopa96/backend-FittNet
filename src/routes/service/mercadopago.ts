import "dotenv/config";
import mercadopago from "mercadopago";
import { Router } from "express";

import Payment from "../../models/Payments";
import Partner from "../../models/Partner"


const { ACCESS_TOKEN } = process.env;

const router = Router();

//Me traigo el SDK de MP
mercadopago.configure({
    access_token: ACCESS_TOKEN as string
})



//Llamo a Mp con los datos de los Planes
router.post('/', (req: any, res: any) => {
    console.log(req.body)
    const idPartner = [req.body[1], req.body[0]._id]
    const tittle = req.body[0].planName
    const unit_price = req.body[0].price.$numberDecimal
    const id = req.body[0]._id


    const items_ml = [{
        id: id,
        title: tittle,
        unit_price: parseInt(unit_price),
        quantity: 1
    }]
    //Creo el objeto con las preferencias para MP
    let preference = {
        items: items_ml,
        external_reference: `${idPartner}`,
        payment_methods: {
            excluded_payment_types: [
                { id: 'atm' }
            ],
            installments: 1 //Maximo de cuotas
        },
        back_urls: {
            success: 'https://fittnet-g11.vercel.app/api/service/mercadopago/pagos',
            failure: 'https://fittnet-g11.vercel.app/api/service/mercadopago/pagos'
        }
    }

    mercadopago.preferences.create(preference)

        .then(function (response: any) {
            console.info('respondio')
            const globalId = global as any
            globalId.id = response.body.id;
            console.log(response.body)
            res.json({ id: globalId.id })
        })
        .catch(function (error: any) {
            console.log(error)
        })
});

router.get('/pagos', async (req: any, res: any) => {
    console.info('lo que me devuelve MP', req)
    console.log('Querys', req.query)
    const arrayIds = req.query.external_reference.split(',')
    const idPartner = arrayIds[0]
    const idPlan = arrayIds[1]

    await Partner.findByIdAndUpdate(idPartner, {
        planType: idPlan,
        paidOut: true
    },
        { new: true }
    )

    const paymentCreate = new Payment({ partner: idPartner, description: 'Pago del mes', plan: idPlan })
    await paymentCreate.save()


    res.redirect("https://fittnet-g11.vercel.app/")

})

export default router;