import { type Document } from "mongoose";
import AvatarModel from "../models/avatar_model";

// INTERFACE IMPLEMENTS AVATAR CLASS
export interface AvatarServiceClassI {
    readonly AvatarModel: typeof AvatarModel;
}

// INTERFACE INPUT DATA
export interface AvatarInput {
    avatarName: string;
    avatarImage: string;
    features?: string[];
}

// INTERFACE MODEL
export interface AvatarI extends AvatarInput, Document { }

// TYPE AVATAR RESPONSE
type AvatarsResponse = {
    data: AvatarI[];
    message: string;
}

// INTERFACE METHOD GETALL AVATARS
export interface GetAvatarsResponse {
    status: number;
    response: AvatarsResponse
}

type CreateAvatar = {
    data: AvatarI;
    message: string;
}

// INTERFACE METHOD CREATE AVATAR
export interface CreateAvatarResponse {
    status: number;
    response: CreateAvatar;
}