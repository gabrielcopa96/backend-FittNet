import { Request, Response } from 'express';
import User from '../../models/User';
import { isValidObjectId } from '../../utils/ValidObjectId';
import AvatarServiceClass from "../services/avatar_class.service";
import { CreateAvatarResponse, GetAvatarsResponse } from '../interfaces/avatar_interface';

/* ------------------------------ CONTROLLER GET AVATARS ------------------------------------ */
export const getAvatars = async (req: Request, res: Response): Promise<void> => {
    try {

        const avatars: GetAvatarsResponse = await AvatarServiceClass.getAll();

        res.status(avatars.status).json(avatars.response);

    } catch (error: any) {
        
        res.status(error.status).json({
            meessage: error.message
        })
    }
}

/* ------------------------------ CONTROLLER CREATE AVATARS ------------------------------------ */
export const createAvatar = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const avatar: CreateAvatarResponse = await AvatarServiceClass.create(req.body);

        res.status(avatar.status).json(avatar.response);

    } catch (error: any) {
        
        res.status(error.status).json({
            meessage: error.message
        })
    
    }
}

export const updateAvatarForUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { avatar } = req.body;
    try {
        console.log(id, avatar)
        // Verificar el id del usuario
        if (!isValidObjectId(id)) {
            return res.json({ ok: false, msg: "Id de usuario no valido" })
        }

        const UserUpdateAvatar = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        console.log(UserUpdateAvatar, 'Ver si se actualizó')
        res.status(200).json({
            ok: true,
            msg: "Usuario modificado correctamente",
            UserUpdateAvatar,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "No se pudo modificar el usuario"
        })
    }
}