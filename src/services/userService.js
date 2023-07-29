import db from "../models";
import { ROLE } from "../../utils/contants";

const bcrypt = require("bcrypt");
const saltRounds = 10;

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
            const hashPass = bcrypt.hashSync(data.password, saltRounds);
            await user.update({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                password: hashPass,
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

const handleGetAllDoctor = async () => {
    try {
        const doctors = await db.User.findAll({
            where: { roleId: ROLE.DOCTOR },
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
            ],
            nest: true,
        });
        if (doctors) {
            return {
                errorCode: 0,
                message: "Create user successfully",
                data: doctors,
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
        const doctor = await db.User.findOne({
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
                        "note",
                        "introduction",
                        "traningProcess",
                        "experience",
                    ],
                },
            ],
            nest: true,
        });
        if (doctor) {
            return {
                errorCode: 0,
                message: "Get doctor by id successfully",
                data: doctor,
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
            note: data.note,
            introduction: data.introduction,
            traningProcess: data.traningProcess,
            experience: data.experience,
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
                note: data.note,
                introduction: data.introduction,
                traningProcess: data.traningProcess,
                experience: data.experience,
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
};
