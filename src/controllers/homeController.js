import * as homeService from "../services/homeService";

const getNameUser = async (req, res) => {
    console.log("check req.query.id: >>>", req.query.id);
    try {
        let data = await homeService.handleGetNameuser(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

export { getNameUser };
