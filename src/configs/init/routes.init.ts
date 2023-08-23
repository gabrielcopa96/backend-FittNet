import { Express } from 'express';
import ExpressInit from "./express.init";
import routes from '../../routes';


export const InitRoutes = () => {
    const server: Express = ExpressInit.server;

    server.use("/", routes);
}

export default InitRoutes;