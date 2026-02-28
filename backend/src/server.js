// importing standard modules
import express from "express";

//importing otther files for usuage
import { ENV } from "./lib/ENV.js";
import { connectDB } from "./lib/connectDB.js";
import authRoutes from "./routes/auth.routes.js"

// making main app
const app = express();

// using standard middlewares
app.use(express.json());

// using routers
app.use("./api/auth" , authRoutes)

// running the app on local port
app.listen(ENV.PORT , () => {
    console.log("Server is running at port :",ENV.PORT);
    connectDB();
})
