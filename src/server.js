import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./router/web";
import connectDB from "./config/connectDB";

require("dotenv").config();

const app = express();

const cors = require("cors");
app.use(cors()); // Use this after the variable declaration

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Port:", port);
});
