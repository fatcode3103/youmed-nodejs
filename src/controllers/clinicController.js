import * as clinicService from "../services/clinicService";

const createClinic = async (req, res) => {
    try {
        let mess = await clinicService.handleCreateClinic(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllClinic = async (req, res) => {
    try {
        let data = await clinicService.handleGetAllClinic(req.query.limit);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getClinicById = async (req, res) => {
    try {
        let mess = await clinicService.handleGetClinicById(req.query.clinicId);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createClinicSpecialty = async (req, res) => {
    try {
        let mess = await clinicService.handleCreateClinicSpecialty(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createClinicDetail = async (req, res) => {
    try {
        let mess = await clinicService.handleCreateClinicDetail(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const updateClinicDetail = async (req, res) => {
    try {
        let mess = await clinicService.handleUpdateClinicDetail(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createClinicSchedule = async (req, res) => {
    try {
        let mess = await clinicService.handleCreateClinicSchedule(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getClinicSchedule = async (req, res) => {
    try {
        let data = await clinicService.handleGetClinicSchedule(req.query);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const updateClinicScheduleById = async (req, res) => {
    try {
        let mess = await clinicService.handleUpdateClinicScheduleById(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getClinicScheduleById = async (req, res) => {
    try {
        let data = await clinicService.handleGetClinicScheduleById(
            req.query.clinicId
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
    createClinic,
    getAllClinic,
    getClinicById,
    createClinicSpecialty,
    createClinicDetail,
    updateClinicDetail,
    createClinicSchedule,
    getClinicSchedule,
    updateClinicScheduleById,
    getClinicScheduleById,
};
