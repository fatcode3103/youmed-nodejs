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
        let data = await hospitalService.handleGetAllHospital();
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

export {
    createHospital,
    getAllHospital,
    createHospitalDetail,
    createHospitalSpecialty,
    getHospitalById,
    getHospitaSpecialtylById,
};
