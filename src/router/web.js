import express from "express";
import * as userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
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

    //doctor
    router.get("/api/get-all-doctor", userController.getAllDoctor);
    router.get("/api/get-doctor-by-id", userController.getDoctorById);
    router.post(
        "/api/post-doctor-info-by-id",
        userController.postDoctorInfoById
    );
    router.get(
        "/api/get-doctor-detail-info",
        userController.getDoctorDetailInfo
    );
    router.put(
        "/api/update-doctor-detail-info",
        userController.putDoctorDetailInfo
    );

    return app.use("/", router);
};

export default initWebRoutes;
