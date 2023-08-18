import { Schema, model } from "mongoose"

const paymentSchema = new Schema({
    paymentName: {
        type: String,
        required: true,
    },
    payType: [String]
});

const PaymentType = model('PaymentType', paymentSchema);
export default PaymentType;
