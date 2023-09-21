import express from "express";
import * as userController from "../controllers/userController";
import * as specialtyController from "../controllers/specialtyController";
import * as hospitalController from "../controllers/hospitalController";
import * as clinicController from "../controllers/clinicController";
import * as searchController from "../controllers/searchController";

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
    router.post(
        "/api/post-verify-book-appointment",
        userController.postVerifyBookAppointment
    );
    router.post(
        "/api/post-success-appointment",
        userController.postSuccessBookAppointment
    );
    router.get(
        "/api/get-booking-appointment",
        userController.getBookingAppointment
    );

    //hospital
    router.post("/api/post-hospital", hospitalController.createHospital);
    router.get("/api/get-all-hospital", hospitalController.getAllHospital);
    router.post(
        "/api/post-hospital-detail",
        hospitalController.createHospitalDetail
    );
    router.post(
        "/api/post-hospital-specialty",
        hospitalController.createHospitalSpecialty
    );
    router.get("/api/get-hospital-by-id", hospitalController.getHospitalById);
    router.put(
        "/api/update-hospital-detail",
        hospitalController.updateHospitalDetail
    );
    router.get(
        "/api/get-hospital-specialty-by-id",
        hospitalController.getHospitaSpecialtylById
    );
    router.post(
        "/api/create-hospital-schedule",
        hospitalController.createHospitalSchedule
    );
    router.get(
        "/api/get-hospital-schedule",
        hospitalController.getHospitalSchedule
    );
    router.put(
        "/api/update-hospital-schedule",
        hospitalController.updateHospitalSchedule
    );
    router.get(
        "/api/get-hospital-schedule-by-id",
        hospitalController.getHospitalScheduleById
    );
    // clinic
    router.post("/api/create-clinic", clinicController.createClinic);
    router.get("/api/get-all-clinic", clinicController.getAllClinic);
    router.get("/api/get-clinic-by-id", clinicController.getClinicById);
    router.post(
        "/api/create-clinic-specialty",
        clinicController.createClinicSpecialty
    );
    router.post(
        "/api/create-clinic-detail",
        clinicController.createClinicDetail
    );
    router.put(
        "/api/update-clinic-detail",
        clinicController.updateClinicDetail
    );
    router.post(
        "/api/create-clinic-schedule",
        clinicController.createClinicSchedule
    );
    router.get("/api/get-clinic-schedule", clinicController.getClinicSchedule);
    router.put(
        "/api/update-clinic-schedule-by-id",
        clinicController.updateClinicScheduleById
    );
    router.get(
        "/api/get-clinic-schedule-by-id",
        clinicController.getClinicScheduleById
    );

    //search
    router.post("/api/post-query-search", searchController.postQuerySearch);

    //search specialty
    router.post(
        "/api/post-query-search-specialty",
        searchController.postQuerySearchSpecialty
    );

    return app.use("/", router);
};

export default initWebRoutes;
