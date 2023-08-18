import { Types } from 'mongoose';
import User from '../models/User';
import InfoUser from '../models/InfoUser';
import jwt_decode from 'jwt-decode';
import bcrypt from 'bcrypt';
import Address from '../models/Address';
import Diseases from '../models/Diseases';
import DiseasesType from '../models/DiseasesType';

export async function findUser(userName: any) {
    try {
        const response = await User.findOne(userName)
            .populate('avatar')
            .populate('info')
            .populate('partner')
        return response
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export async function findAllUsers() {
    try {
        const response = await User.find({})
            .populate('avatar')
            .populate('info')
            .populate('partner')
        return response
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getUserDetails = async (req: any, res: any) => {
    const { id } = req.params;
    const user: any = await User.findById(id)
        .populate('avatar')
        .populate('favourite')

    const infoUser = await InfoUser.findById(user.info)
        .populate('diseases')
        .populate('disease')
        .populate('address')

    res.json({
        ok: true,
        user,
        infoUser
    })
}

export const getUser = async (req: any, res: any) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await User.findById(id)
            .populate({ path: "info", populate: { path: "diseases", populate: { path: "desease", model: DiseasesType } } })
            .populate({ path: "info", populate: { path: "address" } })
            .populate({ path: "avatar" })
        res.json({
            ok: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Unexpected error"
        })
    }
}

export const updateUser = async (req: any, res: any) => {
    const { id } = req.params
    try {
        const body = req.body

        const dataDesease = body.desease //! enfermedades body
        console.log(dataDesease)

        const findDesTypes = await DiseasesType.find()
        const fil = findDesTypes.filter((e: any) => dataDesease.includes(e.deseaseName))
        const deseaseId = fil.map((x: any) => x._id);
        // const allDesease = await Diseases.find();
        // const igualesDeseases = allDesease.filter(x => dataDesease.some(y => y.desease === x.desease));
        // const desigualesDesease = dataDesease.filter(x => !allDesease.some(y => y.desease === x.desease));

        // let finallyDesease = []
        // let idDesiguales = []
        // if (desigualesDesease.length > 0) {
        //     idDesiguales = finallyDesease.map(x => x._id);
        // }
        //const diseasesType = await

        /* finallyDesease = await Diseases.create(dataDesease)

        const idDesease = finallyDesease.map(x => x._id); */

        // const concatDesease = [...igualesDeseases.map(x => x._id), ...idDesiguales]
        const newDiseasesUser = {
            desease: deseaseId,
            trainlimits: body.trainlimits,
            considerations: body.considerations
        }

        const finallyDesease = await Diseases.create(newDiseasesUser)

        const newAddressUser = {
            street: body.street,
            floor: body.floor,
            address: body.address,
            apartament: body.apartament,
            neighborhood: body.neighborhood,
            city: body.city,
            country: body.country,
            zipCode: body.zipCode
        }
        const user: any = await User.findById(id)



        const idInfo = user.info
        const idAvatar = user.avatar
        const infoUsuario: any = await InfoUser.findById(idInfo);

        let idAddress = infoUsuario.address ? infoUsuario.address : null

        if (idAddress === null) {
            const addressUser = new Address(newAddressUser)
            await addressUser.save()
            idAddress = addressUser._id
        } else {
            await Address.findByIdAndUpdate(idAddress, newAddressUser, { new: true })
        }
        const newInfoUser = {
            username: body.username,
            lastName: body.lastname,
            phone: body.phone,
            birthday: body.birthday,
            avatar: idAvatar,
            address: idAddress,
            diseases: finallyDesease._id,
            gender: body.gender,
            photo: body.photo,
        }
        const updUser = await InfoUser.findByIdAndUpdate(idInfo, newInfoUser, { new: true })
            .populate("address");
        res.status(200).json({
            ok: true,
            updUser,
            msg: "se creo correctamente"
        })
    } catch (error) {
        console.log(error, "no se creo")
        res.status(500).json({
            ok: false,
            msg: "no se pudo actualizar el usuario"
        })
    }
}

export async function deleteUser(id: any) {
    try {
        const userDeleted = await User.findByIdAndDelete(id)
        console.log(userDeleted)
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getUserGoogleAccount = async (req: any, res: any) => {
    const { token } = req.body;
    const usuario: any = jwt_decode(token)
    const userName = usuario.email
    try {
        const user = await User.findOne({ userName: userName })
            .populate({ path: "info", populate: { path: "diseases", populate: { path: "desease", model: DiseasesType } } })
            .populate({ path: "info", populate: { path: "address" } })
            .populate({ path: "avatar" })
        return res.status(200).json({
            ok: true,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Unexpected error"
        })
    }
}

export const googleSignIn = async (req: any, res: any) => {
    const googleToken = req.body.tokenId
    const { email, name, given_name, family_name, picture } = req.body.data;
    console.log(req.body)
    const userName = email;
    try {
        const usuarioDb = await User.findOne({ userName })
        let usuario;
        if (!usuarioDb) {
            const userInfo = new InfoUser({
                name: name,
                lastName: family_name,
                email: userName,
                photo: picture,
            });
            await userInfo.save();
            const infoId = userInfo._id
            usuario = new User({
                name: given_name,
                userName: userName,
                password: "0xoaudfj203ru09dsfu2390fdsfc90sdf2dfs",
                type: "user",
                active: true,
                info: infoId
            });
        } else {
            usuario = usuarioDb;
        }
        let newUser = await usuario.save();

        console.log(newUser);

        let user = {
            userId: newUser._id, avatar: newUser.avatar, type: newUser.type,
            latitude: newUser.latitude, longitude: newUser.longitude
        };


        res.json({
            ok: true,
            usuario,
            googleToken,
            user
        })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            ok: false,
            msg: "No se pudo crear el usuario"
        })
    }
}

export function isValidObjectId(id: any) {

    if (Types.ObjectId.isValid(id)) {
        if ((String)(new Types.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


export async function updatePassword(userId: any, newPassword: any, password: any, secretToken: any) {
    if (userId && newPassword && password && !secretToken) {
        // Entonces hablamos de una actualización de password
        // El usuario quiere actualizar su password
        // 1. Buscar el userId y validar su password (passport)
        // 2. Setearle la nueva password.

        let validation = await findUser({ _id: userId }) //busca en mongoDB el usuario
            .then((user: any) => {
                if (!user) {
                    return false;
                }
                if (user) {
                    // Si tengo usuario retorno una nueva promesa
                    return bcrypt.compare(password, user.password)
                        .then((res: any) => {
                            if (res === false) { // No hay coincidencia entre las password
                                return false;
                            }
                            if (res === true) { // Si hay coincidencia entre las password
                                // console.log(user, res, ' user en la 54');                                
                                return true;
                            }
                        });
                }
            })
            .catch((err: any) => {
                console.log(err);
                throw err;
            });
        // validation puede ser igual a false o true (en caso de que el usuario 
        // exista y su password sea correcta)

        if (validation) { // Seteo la nueva contraseña
            let salt = 8;
            // Hashear la nueva clave, buscar el user por id y stear la hashpassword
            let newHashPassword = await bcrypt.hash(newPassword, salt);
            let findAndUpdate = await User.findOneAndUpdate({ _id: userId }, { password: newHashPassword })

            if (findAndUpdate) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    }
    if (userId && newPassword && !password && secretToken) {
        // Entonces hablamos de una recuperación de password
        // 1. El usuario intente recuperar una cuenta porque se olvidó el password
        // 2. El usuario quiere actualizar su password y validar el token
        // 3. Setear la nueva password
        console.log(userId, newPassword, secretToken, '¿Qué pasaaa? 2')
        let findUserId = await findUser({ _id: userId })
        console.log(findUserId, '¿Qué pasaaa? 3')

        if (!findUserId) return "Usuario no encontrado";

        if (findUserId.secretToken !== secretToken) return "Token de recuperación incorrecto";

        let salt = 8;
        // Hashear la nueva clave, buscar el user por id y stear la hashpassword
        let newHashPassword = await bcrypt.hash(newPassword, salt);
        let findAndUpdate = await User.findOneAndUpdate({ _id: userId }, { password: newHashPassword, active: true })

        if (findAndUpdate) {
            return true;
        } else {
            return false;
        }

    }
}
