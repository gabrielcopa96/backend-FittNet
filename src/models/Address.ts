import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    street: {
        type: String,
    },
    floor: {
        type: Number,
    },
    address: {
        type: String,
    },
    apartment: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
});

const Address = model("Address", addressSchema);
export default Address;