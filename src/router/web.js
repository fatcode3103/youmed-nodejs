import express from "express";
import * as homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello");
    });

    ///mcv
    router.get("/api/get-name-user", homeController.getNameUser);

    return app.use("/", router);
};

export default initWebRoutes;
