import passport from "passport";
import { Strategy } from "passport-local";
import { findUser } from "../../controllers/users";
import bcrypt from "bcrypt";
/* ------------- INSTANCE EXPRESS ------------- */
import ServerExpress from "./express.init";

const PassportInit = () => {
    passport.use(
        new Strategy(function (username: any, password: any, done: any) {
            console.log('paso uno de la autenticación')
            findUser({ userName: username }) //busca en mongoDB el usuario
                .then((user: any) => {
                    if (!user) {
                        return done(null, false);
                    }
                    if (user) {
                        // Voy a hacer la comparación y evaluar el resultado
                        bcrypt.compare(password, user.password)
                            .then((res: any) => {
                                // console.log(res, 'la respuesta de la promesa')
                                if (res === false) { // No hay coincidencia entre las password
                                    return done(null, false);
                                }
                                if (res === true) { // Si hay coincidencia entre las password
                                    // console.log(user, res, ' user en la 54');
                                    return done(null, user);
                                }
                            })
                    }
                })
                .catch((err: any) => {
                    console.log(err);
                    return done(err);
                });
        })
    );

    passport.serializeUser(function (user: any, done: any) {
        done(null, user._id);
    });

    passport.deserializeUser(function (_id: any, done: any) {
        findUser({ _id: _id })
            .then((user: any) => {
                done(null, user);
            })
            .catch((err: any) => {
                return done(err);
            })
    });

    ServerExpress.server.use(passport.initialize());
    ServerExpress.server.use(passport.session());
}

export default PassportInit;