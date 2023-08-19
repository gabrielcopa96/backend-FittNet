import { Schema, model } from "mongoose";
import { AvatarI } from "../interfaces/avatar_interface";

const avatarSchema = new Schema<AvatarI>({
    avatarName: {
        type: String,
        required: true,
    },
    avatarImage: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
    }
}, {
    versionKey: false,
});

const AvatarModel = model('Avatar', avatarSchema);
export default AvatarModel;