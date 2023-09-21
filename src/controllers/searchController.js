import * as searchService from "../services/searchService";

const postQuerySearch = async (req, res) => {
    try {
        let result = await searchService.handlePostQuerySearch(req.query);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

const postQuerySearchSpecialty = async (req, res) => {
    try {
        let result = await searchService.handlePostQuerySearchSpecialty(
            req.query
        );
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from the server",
        });
    }
};

export { postQuerySearch, postQuerySearchSpecialty };
