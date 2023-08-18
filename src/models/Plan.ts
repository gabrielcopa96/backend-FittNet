import { Schema, model, Types } from "mongoose";

const userPlanSchema = new Schema({
    planName: {
        type: String,
        required: true,
    },
    services: [String],
    price: {
        type: Types.Decimal128,        
    },
    commission: {
        type: Types.Decimal128,
    },
    gymsPermited: {
        type: Number,
    },
    servicePerGym: {
        type: Number,
    }
    
});

const PlanModel = model("Plan", userPlanSchema);
export default PlanModel;