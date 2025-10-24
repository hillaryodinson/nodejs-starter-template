import helmet from "helmet";
import path from "path";
import fs from "fs";
import cors from "cors";
import express, { Request, Response } from "express";
import { errorHandler, limiter } from "./middlewares/middleware";
import swaggerUi from "swagger-ui-express";
import { specs } from "./libs/swagger";
import initRoutes from "./routes/default";

export const initApp = () => {
	const app = express();
	app.set("view engine", "ejs");
	app.locals.appName = process.env.APPNAME;

	app.set("views", path.join(__dirname, "/views"));
	app.use(express.static(path.join(__dirname, "public")));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		helmet({
			contentSecurityPolicy: false,
			xDownloadOptions: false,
		})
	);
	app.set("trust proxy", 1);

	app.use(
		cors({
			origin: ["http://localhost:3000"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		})
	);

	if (!fs.existsSync("uploads")) {
		fs.mkdirSync("uploads");
		fs.mkdirSync("uploads/original");
	}

	app.use(limiter);

	app.get("/", (req: Request, res: Response) => {
		res.render("index");
	});

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
	initRoutes("/api", app);

	app.use(errorHandler);
	return app;
};
