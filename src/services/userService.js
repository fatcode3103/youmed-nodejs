import { emit } from "nodemon";
import db from "../models";

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
            if (password === user.password) {
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
        return e;
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
        return e;
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
        return e;
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
            let res = await db.User.create({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                password: data.password,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                positionId: data.position,
                roleId: data.role,
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
                    message: "Failed",
                };
            }
        }
    } catch (e) {
        return e;
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
        return e;
    }
};

const handleEditUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
            raw: false,
        });
        if (user) {
            await user.update({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                password: data.password,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                positionId: data.position,
                roleId: data.role,
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
        return e;
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
        return e;
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
};
