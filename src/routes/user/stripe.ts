import "dotenv/config";
import { Router } from "express";
import Stripe from 'stripe';

const { API_STRIPE } = process.env;

const router = Router();

const stripe = new Stripe(
    API_STRIPE as string,
    {
        apiVersion: "2020-08-27"
    }
)

router.post('/', async (req: any, res: any) => {
    try {
        const { id, amount } = req.body;
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            transfer_data: {
                amount: amount * .9,
                destination: 'acct_1L8ue22QtfyOgkUu',
            },
            currency: 'usd',
            payment_method: id,
            transfer_group: 'ORDER10',
            confirm: true,
        })
            .then(() => {
                return true
            })
            .catch((error: any) => {
                return false
            })
        console.log(payment, 'promesa stripe')
        if (payment === true) {
            return res.send('todok')
        } else {
            return res.send('todomal')
        }
    } catch (error) {
        console.log(error)
    }
})

export default router;