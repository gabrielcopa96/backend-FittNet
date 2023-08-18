import { Schema, model, SchemaTypes, Types } from "mongoose";

const shopCartSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: "Users",
    },
    gyms: {
        type: Array,
        of: SchemaTypes.ObjectId,
        ref: "Gyms",
    },
    services: {
        type: Array,
        of: SchemaTypes.ObjectId,
        ref: "Services",
    },
    quantity: {
        type: Number
    },
    price: {
        type: Types.Decimal128
    },
    total: {
        type: Types.Decimal128
    },
    status: {
        type: String,        
        default: "Pending"
    },
    createdAt: {
        type: Date,
        required: true,
        inmutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
    }
});

const ShopCartModel = model("ShopCart", shopCartSchema);
export default ShopCartModel;