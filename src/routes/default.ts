import type { Express } from "express-serve-static-core";
import HealthRoute from "./health.route";

const initRoutes = (baseRoute: string, app: Express) => {
	app.use(`${baseRoute}/health`, HealthRoute);
};

export default initRoutes;
