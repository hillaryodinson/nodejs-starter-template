import swaggerJsDoc from "swagger-jsdoc";

const APPNAME = process.env.APPNAME || "My App Name";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: `${APPNAME} API`,
			version: "1.0.0",
			description: `${APPNAME} API Documentation`,
		},
		servers: [
			{
				url: "http://localhost:3000/api",
				description: "Development server",
			},
		],
	},
	apis: [
		"./src/routes/documentation/*.ts",
		"./src/routes/documentation/**/*.ts",
	],
};

export const specs = swaggerJsDoc(options);
