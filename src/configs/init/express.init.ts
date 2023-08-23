import "dotenv/config";
import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

const { SECRET, PORT } = process.env;

class ExpressInitClass {

    readonly server: Express = express();

    constructor() {}

    public ExpressInit(): void {

        this.server.use(express.urlencoded({ extended: true, limit: "50mb" }));
        this.server.use(express.json({ limit: "50mb" }));
        this.server.use(cookieParser("secreto"));
        this.server.use(morgan("dev"));
        this.server.use(cors());

        this.server.use(
            session({
                secret: SECRET || 'secreto',
                resave: true,
                saveUninitialized: true,
            })
        );

        this.server.listen(PORT, async () => {
            console.log(`Server listening at port ${PORT}`);
        });

    }
}

export default new ExpressInitClass();
