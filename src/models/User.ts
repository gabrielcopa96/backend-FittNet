import { Schema, model, SchemaTypes, Types } from "mongoose";
import { regEmail, regWord } from '../controlers/regExes';


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        validate: {
            validator: (v: any) => regWord.test(v),
            message: (props: any) => `${props.value} is not a valid Name`
        }
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: (v: any) => regEmail.test(v),
            message: (props: any) => `${props.value} is not a valid User Name`
        }
    },
    password: {
        type: String,
        required: true,
    },
    latitude: {
        type: Types.Decimal128,
    },
    longitude: {
        type: Types.Decimal128,
    },
    active: {
        type: Boolean,
        required: true,
       
    },
    secretToken: {
        type: String,
        required: false,
    },      
    type: {
        type: String,
        required: true,
    },
    avatar: {
        type: SchemaTypes.ObjectId,
        ref: "Avatar",
    },
    info: {
        type: SchemaTypes.ObjectId,
        ref: "InfoUser"
    },
    partner: {
        type: SchemaTypes.ObjectId,
        ref: "Partner"
    },
    favourite: {
        type: [SchemaTypes.ObjectId],
        ref: "gyms"
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

const UserModel = model('Users', userSchema);
export default UserModel;
