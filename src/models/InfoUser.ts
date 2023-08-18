import { Schema, model, SchemaTypes } from "mongoose";
import { regWord, regEmail } from '../controllers/regExes';

const infoUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (v: any) => regWord.test(v),
            message: (props: any) => `${props.value} is not a valid Name`
        }
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: (v: any) => regEmail.test(v),
            message: (props: any) => `${props.value} is not a valid email address`
        }
    },
    phone: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
    },
    photo: {
        type: String,
    },
    diseases: {
        type: SchemaTypes.ObjectId,
        ref: "Diseases"
    },
    emergenciCallTo: { //contacto de emergencias
        type: String,
    },
    emergenciPhone: { //numero para emergencias
        type: Number,
    },
    address: {
        type: SchemaTypes.ObjectId,
        ref: "Address"
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
    },
})

const InfoUserModel = model('InfoUser', infoUserSchema);
export default InfoUserModel;
