import * as userService from "../services/userService";

const handleLogin = async (req, res) => {
    try {
        let dataUser = await userService.handleUserLogin(req.body);
        return res.status(200).json(dataUser);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        let data = await userService.handlGetAllUser();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getAllCode = async (req, res) => {
    try {
        let data = await userService.handleGetAllCode(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const createUser = async (req, res) => {
    try {
        let mess = await userService.handlCreateUser(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        let mess = await userService.handleDeleteUesr(req.query.id);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const editUser = async (req, res) => {
    try {
        let mess = await userService.handleEditUser(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const getUserById = async (req, res) => {
    try {
        let mess = await userService.handleGetUserById(req.query.id);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

export {
    handleLogin,
    getAllUser,
    getAllCode,
    createUser,
    deleteUser,
    editUser,
    getUserById,
};
