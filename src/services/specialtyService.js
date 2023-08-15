import db from "../models";

var _ = require("lodash");

const handleCreateSpecialty = async (data) => {
    try {
        let res = await db.Specialty.create({
            valueVi: data.valueVi,
            valueEn: data.valueEn,
            image: data.image,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Create specialty success",
            };
        } else {
            return {
                errorCode: 2,
                message: "Create specialty failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetAllSpecialty = async () => {
    try {
        let res = await db.Specialty.findAll();
        if (res) {
            return {
                errorCode: 0,
                message: "Get specialty success",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Get specialty failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleCreateDoctorSpecialty = async (data) => {
    try {
        let dataFromDb = await db.Doctor_Specialty.findAll({
            attributes: ["doctorIdKey", "specialtyIdKey"],
            raw: true,
        });
        if (data && dataFromDb) {
            let cmpDifference = _.differenceWith(data, dataFromDb, (a, b) => {
                return (
                    a.doctorIdKey === b.doctorIdKey &&
                    a.specialtyIdKey === b.specialtyIdKey
                );
            });

            if (!_.isEmpty(cmpDifference)) {
                let res = await db.Doctor_Specialty.bulkCreate(cmpDifference);
                if (res) {
                    return {
                        errorCode: 0,
                        message: "Create doctor specialty success",
                        data: res,
                    };
                } else {
                    return {
                        errorCode: 2,
                        message: "Create doctor specialty failed",
                    };
                }
            } else {
                console.log("No change in value");
            }
        } else {
            console.log("data or dataFromDb is undefined or null");
        }
    } catch (e) {
        throw e;
    }
};

const handleGetSpecialtyByDoctor = async (doctorId) => {
    try {
        if (!doctorId) {
            return {
                errorCode: -1,
                message: "Missing doctor id",
            };
        } else {
            let res = await db.Doctor_Specialty.findAll({
                where: { doctorId: doctorId },
            });
            if (!res) {
                return {
                    errorCode: 2,
                    message: "Get specialty by doctor failed",
                };
            } else {
                return {
                    errorCode: 0,
                    message: "Get specialty by doctor success",
                    data: res,
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

export {
    handleCreateSpecialty,
    handleGetAllSpecialty,
    handleCreateDoctorSpecialty,
    handleGetSpecialtyByDoctor,
};
