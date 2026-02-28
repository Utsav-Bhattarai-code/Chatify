// importing standard modules
import express from "express";

//importing otther files for usuage
import { ENV } from "./lib/ENV";

// making main app
const app = express();

// using standard middlewares
app.use(express.json());

// Running the app on local port
app.listen(ENV.PORT , () => {
    console.log("Server is running at port :",ENV.PORT);
})
