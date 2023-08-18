import { Schema, model } from "mongoose";

const socialMediaSchema = new Schema({
    socialMedia: {
        type: String,
        required: true,
    },
    userSM: {
        type: String,
        required: true,
    }
});

const SocialMediaModel = model("SocialMedia", socialMediaSchema);
export default SocialMediaModel;
