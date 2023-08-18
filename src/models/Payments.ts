import { Schema, SchemaTypes, model } from "mongoose";

const paymentSchema = new Schema({
    partner: {
        type: SchemaTypes.ObjectId,
        ref: "Partners",
        required: true,
    },
    description: {
        type: String,
    },
    plan: {
        type: SchemaTypes.ObjectId,
        ref: "Plan",
        required: true,
    },
    payDate: {
        type: Date,
        required: true,
        inmutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
    },
});

const PaymentModel = model("Payment", paymentSchema);
export default PaymentModel;