const { Op } = require("sequelize");
import db from "../models";
import { ROLE, TYPE_SEARCH_PARAM } from "../../utils/constant";

const handleModifyQuerySearch = (res, type = "") => {
    const obj = {};
    res.forEach((item) => {
        const { ...itemCopy } = item;
        if (!obj[itemCopy.id]) {
            obj[itemCopy.id] = {
                ...itemCopy,
                specialtyData: [],
                image: itemCopy.image ? itemCopy.image : itemCopy.logo,
                linkDetail: `/booking/${type}-detail/${itemCopy.id}`,
            };
        }
        if (type === TYPE_SEARCH_PARAM.DOCTOR) {
            obj[itemCopy.id].specialtyData.push(
                itemCopy.doctorSpecialtyData.specialtyData
            );
            delete obj[itemCopy.id].doctorSpecialtyData;
        } else if (type === TYPE_SEARCH_PARAM.HOSPITAL) {
            obj[itemCopy.id].specialtyData.push(
                itemCopy.hospitalSpecialtyData.specialtyData
            );
            delete obj[itemCopy.id].hospitalSpecialtyData;
        } else if (type === TYPE_SEARCH_PARAM.CLINIC) {
            obj[itemCopy.id].specialtyData.push(
                itemCopy.clinicSpecialtyData.clinicSpecialtyDetailData
            );
            delete obj[itemCopy.id].clinicSpecialtyData;
        }
    });
    return Object.values(obj);
};

const handlePostQuerySearch = async ({ q, type }) => {
    try {
        const isTypeAll = type === TYPE_SEARCH_PARAM.ALL;
        let resultForTypeAll = [];
        let res;
        let words = q.toLowerCase().split(" ");
        let linkSearchResult = `/search?q=${q}&type=${type}`;
        if (type === TYPE_SEARCH_PARAM.DOCTOR || isTypeAll) {
            res = await db.User.findAll({
                where: {
                    roleId: ROLE.DOCTOR,
                    [Op.and]: words.map((word) => {
                        return {
                            [Op.or]: [
                                {
                                    firstName: {
                                        [Op.like]: `%${word}%`,
                                    },
                                },
                                {
                                    lastName: {
                                        [Op.like]: `%${word}%`,
                                    },
                                },
                            ],
                        };
                    }),
                },
                attributes: ["id", "firstName", "lastName", "image"],
                include: [
                    {
                        model: db.DoctorInfo,
                        as: "detailInfoData",
                        attributes: ["address"],
                    },
                    {
                        model: db.Doctor_Specialty,
                        as: "doctorSpecialtyData",
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
                const result = handleModifyQuerySearch(
                    res,
                    TYPE_SEARCH_PARAM.DOCTOR
                );
                if (isTypeAll) {
                    resultForTypeAll = resultForTypeAll.concat(result);
                } else {
                    return {
                        errorCode: 0,
                        message: "Search doctor success",
                        data: { result, linkSearchResult },
                    };
                }
            }
        }
        if (type === TYPE_SEARCH_PARAM.HOSPITAL || isTypeAll) {
            res = await db.hospital.findAll({
                where: {
                    [Op.and]: words.map((word) => {
                        return {
                            [Op.or]: [
                                {
                                    name: {
                                        [Op.like]: `%${word}%`,
                                    },
                                },
                            ],
                        };
                    }),
                },
                attributes: ["id", "name", "logo", "address"],
                include: [
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
                const result = handleModifyQuerySearch(
                    res,
                    TYPE_SEARCH_PARAM.HOSPITAL
                );
                if (isTypeAll) {
                    resultForTypeAll = resultForTypeAll.concat(result);
                } else {
                    return {
                        errorCode: 0,
                        message: "Search hospital success",
                        data: { result, linkSearchResult },
                    };
                }
            }
        }
        if (type === TYPE_SEARCH_PARAM.CLINIC || isTypeAll) {
            res = await db.Clinic.findAll({
                where: {
                    [Op.and]: words.map((word) => {
                        return {
                            [Op.or]: [
                                {
                                    name: {
                                        [Op.like]: `%${word}%`,
                                    },
                                },
                            ],
                        };
                    }),
                },
                attributes: ["id", "name", "logo", "address"],
                include: [
                    {
                        model: db.Clinic_Specialty,
                        as: "clinicSpecialtyData",
                        attributes: ["id", "clinicId"],
                        include: [
                            {
                                model: db.Specialty,
                                as: "clinicSpecialtyDetailData",
                                attributes: ["valueVi", "valueEn"],
                            },
                        ],
                    },
                ],
                nest: true,
                raw: true,
            });
            if (res) {
                // handle specilatyArr
                const result = handleModifyQuerySearch(
                    res,
                    TYPE_SEARCH_PARAM.CLINIC
                );
                if (isTypeAll) {
                    resultForTypeAll = resultForTypeAll.concat(result);
                } else {
                    return {
                        errorCode: 0,
                        message: "Search hospital success",
                        data: { result, linkSearchResult },
                    };
                }
            }
        }
        return {
            errorCode: 0,
            message: "Search all success",
            data: { result: resultForTypeAll, linkSearchResult },
        };
    } catch (e) {
        throw e;
    }
};

const handlePostQuerySearchSpecialty = async ({ specialtyId, type }) => {
    try {
        const isTypeAll = type === TYPE_SEARCH_PARAM.ALL;
        let resultForTypeAll = [];
        let res;
        let linkSearchResult = `/search-specialty?specialtyId=${specialtyId}&type=${type}`;
        if (type === TYPE_SEARCH_PARAM.DOCTOR || isTypeAll) {
            res = await db.Doctor_Specialty.findAll({
                where: {
                    specialtyIdKey: specialtyId,
                },
                include: [
                    {
                        model: db.User,
                        as: "doctorSpecialtyData",
                        attributes: ["firstName", "lastName", "id", "image"],
                        include: [
                            {
                                model: db.DoctorInfo,
                                as: "detailInfoData",
                                attributes: ["address"],
                            },
                            {
                                model: db.Doctor_Specialty,
                                as: "doctorSpecialtyData",
                                attributes: [],
                                include: [
                                    {
                                        model: db.Specialty,
                                        as: "specialtyData",
                                        attributes: ["valueVi", "valueEn"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                nest: true,
                raw: true,
            });

            if (res) {
                const modifyRes = res.map((item) => {
                    const { doctorSpecialtyData } = item;
                    return {
                        ...doctorSpecialtyData,
                    };
                });
                const result = handleModifyQuerySearch(
                    modifyRes,
                    TYPE_SEARCH_PARAM.DOCTOR
                );
                if (isTypeAll) {
                    resultForTypeAll = resultForTypeAll.concat(result);
                } else {
                    return {
                        errorCode: 0,
                        message: "Search doctor specialty success",
                        data: { result, linkSearchResult },
                    };
                }
            }
        }
        if (type === TYPE_SEARCH_PARAM.HOSPITAL || isTypeAll) {
            res = await db.Hospital_Specialty.findAll({
                where: {
                    specialtyId: specialtyId,
                },
                attributes: [],
                include: [
                    {
                        model: db.hospital,
                        as: "hospitalSpecialtyData",
                        attributes: ["name", "address", "id", "logo"],
                        include: [
                            {
                                model: db.Hospital_Specialty,
                                as: "hospitalSpecialtyData",
                                attributes: [],
                                include: [
                                    {
                                        model: db.Specialty,
                                        as: "specialtyData",
                                        attributes: ["valueVi", "valueEn"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                nest: true,
                raw: true,
            });
            if (res) {
                const modifyRes = res.map((item) => {
                    const { hospitalSpecialtyData } = item;
                    return {
                        ...hospitalSpecialtyData,
                    };
                });
                const result = handleModifyQuerySearch(
                    modifyRes,
                    TYPE_SEARCH_PARAM.HOSPITAL
                );
                if (isTypeAll) {
                    resultForTypeAll = resultForTypeAll.concat(result);
                } else {
                    return {
                        errorCode: 0,
                        message: "Search hospital specialty success",
                        data: { result, linkSearchResult },
                    };
                }
            }
        }
        if (type === TYPE_SEARCH_PARAM.CLINIC || isTypeAll) {
            res = await db.Clinic_Specialty.findAll({
                where: {
                    specialtyId: specialtyId,
                },
                attributes: [],
                include: [
                    {
                        model: db.Clinic,
                        as: "clinicSpecialtyData",
                        attributes: ["name", "address", "id", "logo"],
                        include: [
                            {
                                model: db.Clinic_Specialty,
                                as: "clinicSpecialtyData",
                                attributes: [],
                                include: [
                                    {
                                        model: db.Specialty,
                                        as: "clinicSpecialtyDetailData",
                                        attributes: ["valueVi", "valueEn"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                nest: true,
                raw: true,
            });
            if (res) {
                const modifyRes = res.map((item) => {
                    const { clinicSpecialtyData } = item;
                    return {
                        ...clinicSpecialtyData,
                    };
                });
                const result = handleModifyQuerySearch(
                    modifyRes,
                    TYPE_SEARCH_PARAM.CLINIC
                );
                if (isTypeAll) {
                    resultForTypeAll = resultForTypeAll.concat(result);
                } else {
                    return {
                        errorCode: 0,
                        message: "Search clinic specialty success",
                        data: { result, linkSearchResult },
                    };
                }
            }
        }
        return {
            errorCode: 0,
            message: "Search all specialty success",
            data: { result: resultForTypeAll, linkSearchResult },
        };
    } catch (e) {
        throw e;
    }
};

export { handlePostQuerySearch, handlePostQuerySearchSpecialty };
