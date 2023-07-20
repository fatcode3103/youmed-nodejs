import express from "express";
import * as userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello");
    });

    //login
    router.post("/api/login", userController.handleLogin);

    // get allcode
    router.get("/api/get-all-code", userController.getAllCode);

    //user
    router.get("/api/get-all-user", userController.getAllUser);
    router.post("/api/create-user", userController.createUser);
    router.post("/api/delete-user", userController.deleteUser);
    router.get("/api/get-user-by-id", userController.getUserById);
    router.put("/api/edit-user", userController.editUser);

    return app.use("/", router);
};

export default initWebRoutes;
