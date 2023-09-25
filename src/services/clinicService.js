import { resolveInclude } from "ejs";
import db from "../models";

var _ = require("lodash");

const handleCreateClinic = async (data) => {
    const { logo, name, address } = data;
    try {
        let res = await db.Clinic.create({
            logo: logo,
            name: name,
            address: address,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Create success",
            };
        } else {
            return {
                errorCode: 2,
                message: "Create failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetAllClinic = async (limit) => {
    try {
        let res = await db.Clinic.findAll({
            limit: limit ? +limit : null,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Get success",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Get failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetClinicById = async (clinicId) => {
    try {
        let res = await db.Clinic.findAll({
            where: { id: clinicId },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: db.ClinicDetail,
                    as: "clinicDetailData",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: db.Clinic_Specialty,
                    as: "clinicSpecialtyData",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: db.Specialty,
                            as: "clinicSpecialtyDetailData",
                            attributes: ["id", "valueVi", "valueEn"],
                        },
                    ],
                },
            ],
            nest: true,
            raw: true,
        });
        if (res) {
            let arr = res.map((item) => {
                return item.clinicSpecialtyData.clinicSpecialtyDetailData;
            });
            if (res && res[0] && res[0].clinicSpecialtyData) {
                delete res[0].clinicSpecialtyData;
            }
            return {
                errorCode: 0,
                message: "Get hospital success",
                data: { ...res[0], specialtyData: arr },
            };
        } else {
            return {
                errorCode: 2,
                message: "Get by id failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleCreateClinicDetail = async (data) => {
    try {
        const { selectedClinic, addressMap, images, introduction } = data;
        let res = await db.ClinicDetail.create({
            clinicId: selectedClinic,
            images: images,
            addressMap: addressMap,
            introduction: introduction,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Create detail clinic success",
            };
        } else {
            return {
                errorCode: 2,
                message: "Create detail clinic failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleCreateClinicSpecialty = async (data) => {
    try {
        let dataFromDb = await db.Clinic_Specialty.findAll({
            attributes: ["clinicId", "specialtyId"],
            raw: true,
        });
        if (data && dataFromDb) {
            let cmpDifference = _.differenceWith(data, dataFromDb, (a, b) => {
                return (
                    a.clinicId === b.clinicId && a.specialtyId === b.specialtyId
                );
            });

            if (!_.isEmpty(cmpDifference)) {
                let res = await db.Clinic_Specialty.bulkCreate(cmpDifference);
                if (res) {
                    return {
                        errorCode: 0,
                        message: "Create clinic specialty success",
                    };
                } else {
                    return {
                        errorCode: 2,
                        message: "Create clinic specialty failed",
                    };
                }
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleUpdateClinicDetail = async (data) => {
    try {
        let res = await db.ClinicDetail.findOne({
            where: { clinicId: data.selectedClinic },
            raw: false,
        });
        if (res) {
            await res.update({
                images: data.images,
                addressMap: data.addressMap,
                introduction: data.introduction,
            });
            await res.save();
            return {
                errorCode: 0,
                message: "Update hospital detail success",
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

const handleCreateClinicSchedule = async (data) => {
    try {
        let res = await db.Clinic_Schedule.findOne({
            where: { clinicId: data.selectClinic.value, date: data.date },
        });
        if (res) {
            return {
                errorCode: -1,
                message: "Already exist",
            };
        } else {
            let res = await db.Clinic_Schedule.create({
                clinicId: data.selectClinic.value,
                date: data.date,
                timeType: data.timeJson,
            });
            if (res) {
                return {
                    errorCode: 0,
                    message: "Create success",
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Create failed",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleGetClinicSchedule = async ({ clinicId, date }) => {
    try {
        let res = await db.Clinic_Schedule.findOne({
            where: {
                date: date,
                clinicId: clinicId,
            },
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Get success",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Get failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleUpdateClinicScheduleById = async (data) => {
    try {
        let res = await db.Clinic_Schedule.findOne({
            where: {
                date: data.date,
                clinicId: data.clinicId,
            },
            raw: false,
        });
        if (res) {
            await res.update({
                date: data.date,
                timeType: data.timeJson,
            });
            await res.save();
            return {
                errorCode: 0,
                message: "Get success",
            };
        } else {
            return {
                errorCode: -1,
                message: "Not found",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetClinicScheduleById = async (clinicId) => {
    try {
        let res = await db.Clinic_Schedule.findAll({
            where: {
                clinicId: clinicId,
            },
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Get success",
                data: res,
            };
        } else {
            return {
                errorCode: -1,
                message: "Get failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

export {
    handleCreateClinic,
    handleGetAllClinic,
    handleGetClinicById,
    handleCreateClinicSpecialty,
    handleCreateClinicDetail,
    handleUpdateClinicDetail,
    handleCreateClinicSchedule,
    handleGetClinicSchedule,
    handleUpdateClinicScheduleById,
    handleGetClinicScheduleById,
};
