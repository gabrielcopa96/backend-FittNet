import type { AvatarInput, AvatarI, AvatarServiceClassI, GetAvatarsResponse, CreateAvatarResponse } from "../interfaces/avatar_interface";
import AvatarModel from "../models/avatar_model";

class AvatarServiceClass implements AvatarServiceClassI {

    readonly AvatarModel = AvatarModel;

    constructor() { }

    // METHOD GET ALL AVATARS
    public async getAll(): Promise<GetAvatarsResponse> {
        try {
            const avatars = await this.AvatarModel.find();
            return {
                status: 200,
                response: {
                    data: avatars,
                    message: "List avatars"
                }
            };
        } catch (error) {
            throw {
                status: 404,
                message: "Doesn't exist avatars"
            }
        }
    }

    // METHOS CREATE AVATAR
    public async create(avatar: AvatarInput): Promise<CreateAvatarResponse> {
        try {

            const newAvatar: AvatarI = await this.AvatarModel.create(avatar);

            return {
                status: 201,
                response: {
                    data: newAvatar,
                    message: "Avatar created"
                }
            }

        } catch (error: any) {

            throw {
                status: 404,
                message: "Not found avatar"
            }

        }
    }
}

export default new AvatarServiceClass();