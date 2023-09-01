import db from "../models";

var _ = require("lodash");

const handleCreateHospital = async (data) => {
    try {
        let res = await db.hospital.create({
            name: data.name,
            logo: data.logo,
            coverImg: data.coverImg,
            address: data.address,
            addressMap: data.addressMap,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Create hospital success",
            };
        } else {
            return {
                errorCode: 2,
                message: "Create hospital failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetAllHospital = async () => {
    try {
        let res = await db.hospital.findAll();
        if (res) {
            return {
                errorCode: 0,
                message: "Get all hospital success",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Get all hospital failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleCreateHospitalDetail = async (data) => {
    try {
        let res = await db.HospitalDetail.create({
            hospitalId: data.selectedHospital,
            slogan: data.slogan,
            linkweb: data.linkWeb,
            images: data.images,
            addressMap: data.addressMap,
            switchboard: data.switchboard,
            servicePrice: data.servicePrice,
            billPrice: data.billPrice,
            introduction: data.introduction,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Create detail hospital success",
            };
        } else {
            return {
                errorCode: 2,
                message: "Create detail hospital failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleCreateHospitalSpecialty = async (data) => {
    try {
        let dataFromDb = await db.Hospital_Specialty.findAll({
            attributes: ["hospitalId", "specialtyId"],
            raw: true,
        });
        if (data && dataFromDb) {
            let cmpDifference = _.differenceWith(data, dataFromDb, (a, b) => {
                return (
                    a.doctorId === b.doctorId && a.specialtyId === b.specialtyId
                );
            });

            if (!_.isEmpty(cmpDifference)) {
                let res = await db.Hospital_Specialty.bulkCreate(cmpDifference);
                if (res) {
                    return {
                        errorCode: 0,
                        message: "Create hospital specialty success",
                    };
                } else {
                    return {
                        errorCode: 2,
                        message: "Create hospital specialty failed",
                    };
                }
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleGetHospitalById = async (hospitalId) => {
    try {
        if (hospitalId) {
            let res = await db.hospital.findAll({
                where: { id: hospitalId },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: db.HospitalDetail,
                        as: "hospitalDetailData",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: db.Hospital_Specialty,
                        as: "hospitalSpecialtyData",
                        attributes: ["id", "hospitalId"],
                        include: [
                            {
                                model: db.Specialty,
                                as: "specialtyData",
                                attributes: ["valueVi", "valueEn"],
                            },
                        ],
                    },
                ],
                nest: true,
                raw: true,
            });
            if (res) {
                let arr = [];
                res.forEach((item) => {
                    arr.push(item.hospitalSpecialtyData.specialtyData);
                });
                if (res && res[0] && res[0].hospitalSpecialtyData) {
                    delete res[0].hospitalSpecialtyData;
                }

                return {
                    errorCode: 0,
                    message: "Get hospital success",
                    data: { ...res[0], specialtyData: arr },
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Get hospital failed",
                };
            }
        } else {
            return {
                errorCode: -1,
                message: "Missing parameter",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetHospitaSpecialtylById = async (hospitalId) => {
    try {
        if (hospitalId) {
            let res = await db.Hospital_Specialty.findAll({
                where: { hospitalId: hospitalId },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: db.Specialty,
                        as: "specialtyData",
                        attributes: ["valueVi", "valueEn"],
                    },
                ],
                nest: true,
            });
            if (res) {
                return {
                    errorCode: 0,
                    message: "Get hospital success",
                    data: res,
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Get hospital failed",
                };
            }
        } else {
            return {
                errorCode: -1,
                message: "Missing parameter",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleUpdateHospitalDetail = async (data) => {
    try {
        let res = await db.HospitalDetail.findOne({
            where: { hospitalId: data.selectedHospital },
            raw: false,
        });
        if (res) {
            await res.update({
                slogan: data.slogan,
                linkweb: data.linkWeb,
                images: data.images,
                addressMap: data.addressMap,
                switchboard: data.switchboard,
                servicePrice: data.servicePrice,
                billPrice: data.billPrice,
                introduction: data.introduction,
            });
            await res.save();
            return {
                errorCode: 0,
                message: "Update hospital detail success",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Update hospital detail failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleCreateHospitalSchedule = async (data) => {
    try {
        let res = await db.hospital_schedule.findOne({
            where: {
                hospitalId: data.selectHospital.value,
                date: data.date,
            },
        });
        if (res) {
            return {
                errorCode: -1,
                message: "Already exist",
            };
        } else {
            let res = await db.hospital_schedule.create({
                hospitalId: data.selectHospital.value,
                date: data.date,
                timeType: data.timeJson,
            });
            if (res) {
                return {
                    errorCode: 0,
                    message: "Post hospital schedule successfully !",
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Post hospital schedule failed !",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleGetHospitalSchedule = async ({ date, hospitalId }) => {
    try {
        if (!date || !hospitalId) {
            return {
                errorCode: 2,
                message: "Missing parameter",
            };
        }
        let res = await db.hospital_schedule.findOne({
            where: {
                date: date,
                hospitalId: hospitalId,
            },
        });
        if (!res) {
            return {
                errorCode: -1,
                message: "Not found",
            };
        } else {
            return {
                errorCode: 0,
                message: "Get hospital schedule success",
                data: res,
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleUpdateHospitalSchedule = async (data) => {
    try {
        let res = await db.hospital_schedule.findOne({
            where: {
                date: data.date,
                hospitalId: data.hospitalId,
            },
        });
        if (!res) {
            return {
                errorCode: -1,
                message: "Not found",
            };
        } else {
            await res.update({
                timeType: data.time,
                timestamp: data.timestamp,
            });
            await res.save();
            return {
                errorCode: 0,
                message: "Update hospital schedule success",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetHospitalScheduleById = async (hospitalId) => {
    try {
        let res = await db.hospital_schedule.findAll({
            where: {
                hospitalId: hospitalId,
            },
        });
        if (!res) {
            return {
                errorCode: -1,
                message: "Not found",
            };
        } else {
            return {
                errorCode: 0,
                message: "Get hospital schedule by id success",
                data: res,
            };
        }
    } catch (e) {
        throw e;
    }
};

export {
    handleCreateHospital,
    handleGetAllHospital,
    handleCreateHospitalDetail,
    handleCreateHospitalSpecialty,
    handleGetHospitalById,
    handleGetHospitaSpecialtylById,
    handleUpdateHospitalDetail,
    handleCreateHospitalSchedule,
    handleGetHospitalSchedule,
    handleUpdateHospitalSchedule,
    handleGetHospitalScheduleById,
};
