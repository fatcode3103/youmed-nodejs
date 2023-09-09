import db from "../models";
import { v4 as uuidv4 } from "uuid";

import { ROLE, STATUS, OBJECT } from "../../utils/constant";
import sendEmail from "./sendEmailService";

const bcrypt = require("bcrypt");
const saltRounds = 10;

var _ = require("lodash");

const buildUrlVerifyEmail = (
    distinguishSubjectExamination,
    entityId,
    patientId
) => {
    let linkCofirmAppointment = "";
    let linkSuccessAppointment = "";
    let token = uuidv4();

    if (distinguishSubjectExamination === OBJECT.DOCTOR) {
        linkCofirmAppointment = `http://localhost:3000/verify-booking?doctorId=${entityId}&patientId=${patientId}&token=${token}`;
    } else if (distinguishSubjectExamination === OBJECT.HOSPITAL) {
        linkCofirmAppointment = `http://localhost:3000/verify-booking?hospitalId=${entityId}&patientId=${patientId}&token=${token}`;
    } else if (distinguishSubjectExamination === OBJECT.CLINIC) {
        linkCofirmAppointment = `http://localhost:3000/verify-booking?clinicId=${entityId}&patientId=${patientId}&token=${token}`;
    }
    linkSuccessAppointment = `/success-booking/errorCode=0?patientId=${patientId}&token=${token}`;

    return { linkSuccessAppointment, linkCofirmAppointment, token };
};

const handleUserLogin = async (data) => {
    const { email, password } = data;
    try {
        if (!email || !password) {
            return {
                errorCode: -1,
                message: "Missing parameter",
            };
        }
        let checkEmail = await handleCheckEmail(email);
        if (!checkEmail) {
            return {
                errorCode: 2,
                message:
                    "Your email does not exist in the system. Please try other enmail",
            };
        } else {
            let user = await db.User.findOne({
                where: { email: email },
                raw: true,
            });
            let data = {};
            if (bcrypt.compareSync(password, user.password)) {
                data = { ...user };
                delete data.password;
                return {
                    errorCode: 0,
                    message: "Login is success",
                    data: data,
                };
            } else {
                return {
                    errorCode: 3,
                    message: "Wrong password",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleCheckEmail = async (email) => {
    try {
        let res = await db.User.findOne({
            where: { email: email },
        });
        if (res) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

const handlGetAllUser = async () => {
    try {
        let res = await db.User.findAll({
            attributes: {
                exclude: ["password"],
            },
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Get all user successfully",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetAllCode = async (type) => {
    try {
        let res = await db.AllCode.findAll({
            where: { type: type },
        });
        if (res) {
            return {
                errorCode: 0,
                message: `Get allcode ${type} successfully`,
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handlCreateUser = async (data) => {
    try {
        const isEmail = await db.User.findOne({
            where: { email: data.email },
        });
        if (isEmail) {
            return {
                errorCode: -1,
                message: "Email already exists !",
            };
        } else {
            const hashPass = bcrypt.hashSync(data.password, saltRounds);

            let res = await db.User.create({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                dateOfBirth: data.date,
                password: hashPass,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                positionId: data.position,
                roleId: data.role,
                image: data.img,
            });
            if (res) {
                return {
                    errorCode: 0,
                    message: "Create user successfully",
                    data: res,
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Create user failed",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleDeleteUesr = async (id) => {
    try {
        const user = await db.User.findOne({
            where: { id: id },
        });
        if (user) {
            await user.destroy();
            return {
                errorCode: 0,
                message: "Create user successfully",
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleEditUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
            raw: false,
        });
        if (user) {
            // const hashPass = bcrypt.hashSync(data.password, saltRounds);
            await user.update({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                dateOfBirth: data.date,
                password: data.password,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                positionId: data.position,
                roleId: data.role,
                image: data.img,
            });
            await user.save();
            return {
                errorCode: 0,
                message: "Create user successfully",
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetUserById = async (id) => {
    try {
        const user = await db.User.findOne({
            where: { id: id },
        });
        if (user) {
            return {
                errorCode: 0,
                message: "Create user successfully",
                data: user,
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetAllDoctor = async (limit) => {
    try {
        const doctors = await db.User.findAll({
            where: {
                roleId: ROLE.DOCTOR,
            },
            limit: limit ? +limit : null,
            attributes: {
                exclude: ["password"],
            },
            include: [
                {
                    model: db.AllCode,
                    as: "roleData",
                    attributes: ["valueEn", "valueVi"],
                },
                {
                    model: db.AllCode,
                    as: "positionData",
                    attributes: ["valueEn", "valueVi"],
                },
                {
                    model: db.AllCode,
                    as: "genderData",
                    attributes: ["valueEn", "valueVi"],
                },
                {
                    model: db.DoctorInfo,
                    as: "detailInfoData",
                    attributes: ["workPlace"],
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
            raw: true,
            nest: true,
        });
        if (doctors) {
            const doctorMap = {};
            doctors.forEach((item) => {
                const { ...res } = item;
                if (!doctorMap[res.id]) {
                    doctorMap[res.id] = {
                        ...res,
                        specialtyData: [],
                    };
                }
                doctorMap[res.id].specialtyData.push(
                    res.doctorSpecialtyData.specialtyData
                );
                delete doctorMap[res.id].doctorSpecialtyData;
            });
            const result = Object.values(doctorMap);
            return {
                errorCode: 0,
                message: "Create user successfully",
                data: result,
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetDoctorById = async (doctorId) => {
    try {
        const doctor = await db.User.findAll({
            where: { roleId: ROLE.DOCTOR, id: doctorId },
            attributes: {
                exclude: ["password"],
            },
            include: [
                {
                    model: db.AllCode,
                    as: "roleData",
                    attributes: ["valueEn", "valueVi"],
                },
                {
                    model: db.AllCode,
                    as: "positionData",
                    attributes: ["valueEn", "valueVi"],
                },
                {
                    model: db.AllCode,
                    as: "genderData",
                    attributes: ["valueEn", "valueVi"],
                },
                {
                    model: db.DoctorInfo,
                    as: "detailInfoData",
                    attributes: [
                        "workPlace",
                        "address",
                        "addressMap",
                        "note",
                        "introduction",
                        "traningProcess",
                        "experience",
                        "yearExperience",
                    ],
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
            raw: true,
            nest: true,
        });
        if (doctor) {
            let arr = [];
            doctor.forEach((item) => {
                arr.push(item.doctorSpecialtyData.specialtyData);
            });
            delete doctor[0].doctorSpecialtyData;
            return {
                errorCode: 0,
                message: "Get doctor by id successfully",
                data: {
                    ...doctor[0],
                    specialtyData: arr,
                },
            };
        } else {
            return {
                errorCode: 2,
                message: "Failed",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handlePostDoctorInfoById = async (data) => {
    try {
        let res = await db.DoctorInfo.create({
            doctorId: data.selectedDoctor.value,
            workPlace: data.workPlace,
            address: data.address,
            addressMap: data.addressMap,
            note: data.note,
            introduction: data.introduction,
            traningProcess: data.traningProcess,
            experience: data.experience,
            yearExperience: data.yearExperience,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Create doctor info successfully !",
            };
        } else {
            return {
                errorCode: 2,
                message: "Create doctor info failed !",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetDoctorDetailInfo = async (id) => {
    try {
        let res = await db.DoctorInfo.findOne({
            where: { doctorId: id },
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Get doctor info successfully !",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Get doctor info failed !",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handlePutDoctorDetailInfo = async (data) => {
    try {
        let res = await db.DoctorInfo.findOne({
            where: { doctorId: data.doctorId },
        });
        if (res) {
            await res.update({
                doctorId: data.doctorId,
                workPlace: data.workPlace,
                address: data.address,
                addressMap: data.addressMap,
                note: data.note,
                introduction: data.introduction,
                traningProcess: data.traningProcess,
                experience: data.experience,
                yearExperience: data.yearExperience,
            });
            await res.save();
            return {
                errorCode: 0,
                message: "Update doctor info successfully !",
            };
        } else {
            return {
                errorCode: 2,
                message: "Update doctor info failed !",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handlePostDoctorSchedule = async (data) => {
    try {
        let res = await db.Schedule.findOne({
            where: {
                doctorId: data.selectedDoctor.value,
                date: data.date,
            },
        });
        if (res) {
            return {
                errorCode: -1,
                message: "Already exist",
            };
        } else {
            let res = await db.Schedule.create({
                doctorId: data.selectedDoctor.value,
                date: data.date,
                timeType: data.timeJson,
            });
            if (res) {
                return {
                    errorCode: 0,
                    message: "Post doctor schedule successfully !",
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Post doctor schedule failed !",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

const handleGetDoctorSchedule = async ({ date, doctorId }) => {
    try {
        let res = await db.Schedule.findOne({
            where: {
                date: date,
                doctorId: doctorId,
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
                message: "Get schedule success",
                data: res,
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleUpdateDoctorSchedule = async (data) => {
    try {
        let res = await db.Schedule.findOne({
            where: {
                date: data.date,
                doctorId: data.doctorId,
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
                message: "UPdate schedule success",
            };
        }
    } catch (e) {
        throw e;
    }
};

const handleGetDoctorScheduleById = async (doctorId) => {
    try {
        let res = await db.Schedule.findAll({
            where: {
                doctorId: doctorId,
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
                message: "Get doctor schedule by id success",
                data: res,
            };
        }
    } catch (e) {
        throw e;
    }
};

const handlePostPatientBookAppointment = async (data) => {
    try {
        const {
            date,
            entityId,
            namePatient,
            emailPatient,
            patientId,
            timeType,
            entityInfo,
            language,
            patientInfo,
            distinguishSubjectExamination,
            ...otherPropObj
        } = data;

        const { linkSuccessAppointment, linkCofirmAppointment, token } =
            buildUrlVerifyEmail(
                distinguishSubjectExamination,
                entityId,
                patientId
            );

        let condition = {
            patientId: patientId,
            date: date,
            timeType: timeType,
            doctorId: null,
            hospitalId: null,
            clinicId: null,
        };

        if (distinguishSubjectExamination === OBJECT.DOCTOR) {
            condition.doctorId = entityId;
        } else if (distinguishSubjectExamination === OBJECT.HOSPITAL) {
            condition.hospitalId = entityId;
        } else if (distinguishSubjectExamination === OBJECT.CLINIC) {
            condition.clinicId = entityId;
        }
        const [res, created] = await db.Booking.findOrCreate({
            where: {
                ...condition,
            },
            defaults: {
                status: STATUS.S1,
                doctorId: condition.doctorId,
                hospitalId: condition.hospitalId,
                clinicId: condition.clinicId,
                patientId: patientId,
                date: date,
                timeType: timeType,
                token: token,
            },
        });
        if (!created) {
            return {
                errorCode: -1,
                message: "Create book appointment failed",
            };
        } else {
            const dataSendToEmail = {
                entityInfo: entityInfo,
                redirectLink: linkCofirmAppointment,
                patientInfo: patientInfo,
                language: language,
                namePatient: namePatient,
                emailPatient: emailPatient,
                otherPropObj: otherPropObj,
            };
            await sendEmail(dataSendToEmail);
            return {
                errorCode: 0,
                message: "Create book appointment success",
                data: linkSuccessAppointment,
            };
        }
    } catch (e) {
        throw e;
    }
};

const handlePostVerifyBookAppointment = async (data) => {
    const { patientId, token, ...entityId } = data;
    const { doctorId = null, hospitalId = null, clinicId = null } = entityId;
    try {
        if (_.values(entityId).includes(null) || !patientId || !token) {
            return {
                errorCode: -1,
                message: "Missing parameter",
            };
        } else {
            let res = await db.Booking.findOne({
                where: {
                    doctorId: doctorId,
                    hospitalId: hospitalId,
                    clinicId: clinicId,
                    patientId: patientId,
                    token: token,
                    status: STATUS.S1,
                },
                raw: false,
            });
            if (res) {
                await res.update({
                    status: STATUS.S2,
                });
                await res.save();
                return {
                    errorCode: 0,
                    message: "Appointment confirmed successfully",
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Appointment does not exist or has been confirmed",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

const handlePostSuccessBookAppointment = async (data) => {
    try {
        const { patientId, token } = data;
        if (!patientId || !token) {
            return {
                errorCode: -1,
                message: "Missing parameter",
            };
        } else {
            let res = await db.Booking.findOne({
                where: {
                    patientId: patientId,
                    token: token,
                },
            });
            if (res) {
                return {
                    errorCode: 0,
                    message: "Booking successfully",
                };
            } else {
                return {
                    errorCode: 2,
                    message: "Booking failed",
                };
            }
        }
    } catch (e) {
        throw e;
    }
};

export {
    handleUserLogin,
    handlGetAllUser,
    handleGetAllCode,
    handlCreateUser,
    handleDeleteUesr,
    handleEditUser,
    handleGetUserById,
    handleGetAllDoctor,
    handleGetDoctorById,
    handlePostDoctorInfoById,
    handleGetDoctorDetailInfo,
    handlePutDoctorDetailInfo,
    handlePostDoctorSchedule,
    handleGetDoctorSchedule,
    handleUpdateDoctorSchedule,
    handleGetDoctorScheduleById,
    handlePostPatientBookAppointment,
    handlePostVerifyBookAppointment,
    handlePostSuccessBookAppointment,
};
