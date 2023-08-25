import * as userService from "../services/userService";

const handleLogin = async (req, res) => {
    try {
        let dataUser = await userService.handleUserLogin(req.body);
        return res.status(200).json(dataUser);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        let data = await userService.handlGetAllUser();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllCode = async (req, res) => {
    try {
        let data = await userService.handleGetAllCode(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createUser = async (req, res) => {
    try {
        let mess = await userService.handlCreateUser(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        let mess = await userService.handleDeleteUesr(req.query.id);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const editUser = async (req, res) => {
    try {
        let mess = await userService.handleEditUser(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getUserById = async (req, res) => {
    try {
        let mess = await userService.handleGetUserById(req.query.id);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllDoctor = async (req, res) => {
    try {
        let data = await userService.handleGetAllDoctor(req.query.limit);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getDoctorById = async (req, res) => {
    try {
        let data = await userService.handleGetDoctorById(req.query.doctorId);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const postDoctorInfoById = async (req, res) => {
    try {
        let mess = await userService.handlePostDoctorInfoById(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getDoctorDetailInfo = async (req, res) => {
    try {
        let data = await userService.handleGetDoctorDetailInfo(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const putDoctorDetailInfo = async (req, res) => {
    try {
        let mess = await userService.handlePutDoctorDetailInfo(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const postDoctorSchedule = async (req, res) => {
    try {
        let mess = await userService.handlePostDoctorSchedule(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getDoctorSchedule = async (req, res) => {
    try {
        let data = await userService.handleGetDoctorSchedule(req.query);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const updateDoctorSchedule = async (req, res) => {
    try {
        let data = await userService.handleUpdateDoctorSchedule(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getDoctorScheduleById = async (req, res) => {
    try {
        let data = await userService.handleGetDoctorScheduleById(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const postPatientBookAppointment = async (req, res) => {
    try {
        let mess = await userService.handlePostPatientBookAppointment(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const postVerifyBookAppointment = async (req, res) => {
    try {
        let mess = await userService.handlePostVerifyBookAppointment(req.query);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

export {
    handleLogin,
    getAllUser,
    getAllCode,
    createUser,
    deleteUser,
    editUser,
    getUserById,
    getAllDoctor,
    getDoctorById,
    postDoctorInfoById,
    getDoctorDetailInfo,
    putDoctorDetailInfo,
    postDoctorSchedule,
    getDoctorSchedule,
    updateDoctorSchedule,
    getDoctorScheduleById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
};
