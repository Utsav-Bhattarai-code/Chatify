// importing standard modules
import express from "express";
import cookieParser from "cookie-parser"

//importing otther files for usuage
import { ENV } from "./lib/ENV.js";
import { connectDB } from "./lib/connectDB.js";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import limiter from "./middlewares/rateLimiter.middleware.js";

// making main app
const app = express();

// using standard middlewares
app.use(express.json());
app.use(cookieParser());

// custom rate limiter uauge
app.use(limiter())

// using routers
app.use("./api/auth" , authRoutes)
app.use("./api/message" , messageRoutes)

// running the app on local port
app.listen(ENV.PORT , () => {
    console.log("Server is running at port :",ENV.PORT);
    connectDB();
})
