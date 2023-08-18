import "dotenv/config";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { findUser } from "./controlers/users";
import routes from "./routes/index";
const { SECRET } = process.env || "http://localhost:3000";

import "./db";

const server: Express = express();

// -------------------  MIDDLEWARES-------------

// ---------- CORS, COOKIES, JSON Y URLENCODER -----------
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser("secreto"));
server.use(morgan("dev"));
server.use((req: any, res: any, next: any) => {
  res.header(
    "Access-Control-Allow-Origin", "*" //! -> le estoy dando permisos a todas las URL
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//------------------- AUTHENTICATION ----------------

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
  console.log('paso dos de la autenticación')
  done(null, user._id);
});

passport.deserializeUser(function (_id: any, done: any) {
  console.log('paso tres de la autenticación')
  findUser({ _id: _id })
    .then((user: any) => {
      done(null, user);
    })
    .catch((err: any) => {
      return done(err);
    })
});

server.use(
  session({
    secret: SECRET || 'secreto',
    resave: true,
    saveUninitialized: true,
  })
); // estaban seteados a false

server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
server.use((req: any, res: any, next: any) => {
  // console.log(req.session, ' esto es req.session 120');
  // console.log(req.user, ' esto es req.user 121');
  next();
});
server.get('/login', (req: any, res: any) => {
  res.send('Username o contraseña incorrecta');
});


server.use("/", routes); //! http://localhost:3000/

// --- --- Error catching endware.
server.use((err: any, req: any, res: any, next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
