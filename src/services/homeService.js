import db from "../models/index";

const handleGetNameUser = async () => {
    try {
        let res = await db.User.findAll();
        if (res && res.length > 0) {
            return {
                errorCode: 0,
                message: "Get user success",
                data: res,
            };
        } else {
            return {
                errorCode: 2,
                message: "Error",
            };
        }
    } catch (e) {
        return e;
    }
};

export { handleGetNameUser };
