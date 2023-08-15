import express from "express";
import * as userController from "../controllers/userController";
import * as specialtyController from "../controllers/specialtyController";

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
    router.post("/api/post-doctor-schedule", userController.postDoctorSchedule);
    router.get("/api/get-doctor-schedule", userController.getDoctorSchedule);
    router.get(
        "/api/get-doctor-schedule-by-id",
        userController.getDoctorScheduleById
    );
    router.put(
        "/api/update-doctor-schedule",
        userController.updateDoctorSchedule
    );

    //specialty
    router.post("/api/post-specialty", specialtyController.createSpecialty);
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
    router.post(
        "/api/post-doctor-specialty",
        specialtyController.createDoctorSpecialty
    );
    router.get(
        "/api/get-specialty-by-doctor",
        specialtyController.getSpecialtyByDoctor
    );

    //booking
    router.post(
        "/api/post-patient-book-appointment",
        userController.postPatientBookAppointment
    );

    return app.use("/", router);
};

export default initWebRoutes;
