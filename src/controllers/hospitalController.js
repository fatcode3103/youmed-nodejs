import * as hospitalService from "../services/hospitalService";

const createHospital = async (req, res) => {
    try {
        let mess = await hospitalService.handleCreateHospital(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllHospital = async (req, res) => {
    try {
        let data = await hospitalService.handleGetAllHospital(req.query.limit);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createHospitalDetail = async (req, res) => {
    try {
        let mess = await hospitalService.handleCreateHospitalDetail(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createHospitalSpecialty = async (req, res) => {
    try {
        let mess = await hospitalService.handleCreateHospitalSpecialty(
            req.body
        );
        return res.status(200).json(mess);
    } catch (e) {
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getHospitalById = async (req, res) => {
    try {
        let data = await hospitalService.handleGetHospitalById(
            req.query.hospitalId
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getHospitaSpecialtylById = async (req, res) => {
    try {
        let data = await hospitalService.handleGetHospitaSpecialtylById(
            req.query.hospitalId
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const updateHospitalDetail = async (req, res) => {
    try {
        let mess = await hospitalService.handleUpdateHospitalDetail(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createHospitalSchedule = async (req, res) => {
    try {
        let mess = await hospitalService.handleCreateHospitalSchedule(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getHospitalSchedule = async (req, res) => {
    try {
        let data = await hospitalService.handleGetHospitalSchedule(req.query);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const updateHospitalSchedule = async (req, res) => {
    try {
        let mess = await hospitalService.handleUpdateHospitalSchedule(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getHospitalScheduleById = async (req, res) => {
    try {
        let data = await hospitalService.handleGetHospitalScheduleById(
            req.query.hospitalId
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

export {
    createHospital,
    getAllHospital,
    createHospitalDetail,
    createHospitalSpecialty,
    getHospitalById,
    getHospitaSpecialtylById,
    updateHospitalDetail,
    createHospitalSchedule,
    getHospitalSchedule,
    updateHospitalSchedule,
    getHospitalScheduleById,
};
