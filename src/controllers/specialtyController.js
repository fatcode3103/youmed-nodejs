import * as specialtyService from "../services/specialtyService";

const createSpecialty = async (req, res) => {
    try {
        let mess = await specialtyService.handleCreateSpecialty(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.handleGetAllSpecialty();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createDoctorSpecialty = async (req, res) => {
    try {
        let mess = await specialtyService.handleCreateDoctorSpecialty(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getSpecialtyByDoctor = async (req, res) => {
    try {
        let data = await specialtyService.handleGetSpecialtyByDoctor(
            req.query.id
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
    createSpecialty,
    getAllSpecialty,
    createDoctorSpecialty,
    getSpecialtyByDoctor,
};
