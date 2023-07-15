import db from "../models/index";

const handleGetNameuser = async (idInput) => {
    try {
        if (!idInput) {
            return {
                errorCode: -1,
                message: "Missing parameter",
            };
        }
        let res = await db.User.findAll({
            where: { id: idInput },
            raw: true,
        });
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

export { handleGetNameuser };
