import { Schema, model } from "mongoose";

const avatarSchema = new Schema({
    avatarName: {
        type: String,
        required: true,
    },
    avatarImage: {
        type: String,
        required: true,
    },
    features: {
        type: Array,
        of: String,
    }
});

const AvatarModel = model('Avatar', avatarSchema);
export default AvatarModel;
