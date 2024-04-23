const PublishersService = require("../services/books.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = async (req, res, next ) => {
    if(!req.body?.tenNXB) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const publishersService = new PublishersService(MongoDB.client);
        const documnet = await publishersService.create(req.body);
        return res.send(documnet);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred creating the book")
        );
    }
}