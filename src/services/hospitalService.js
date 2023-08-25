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
            delete res[0].hospitalSpecialtyData;

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
    } catch (e) {
        throw e;
    }
};

const handleGetHospitaSpecialtylById = async (hospitalId) => {
    try {
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
};
