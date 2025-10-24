// import { populateDB } from "./configs/db";
import dotenv from "dotenv";
import { initApp } from "./server";
// import { pingDB } from "./configs/db"; //uncomment for db testing
// import { exit } from "process";
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const app = initApp();

// populateDB();

app.listen(PORT, async () => {
	console.log("✅ Server running on port " + PORT);

	// uncomment for db
	// if (!(await pingDB())) {
	// 	console.log("💾❌ Database not connected");
	// 	// graceful shutdown
	// 	exit(1);
	// } else {
	// 	console.log("💾✅ Database connected");
	// }
});
