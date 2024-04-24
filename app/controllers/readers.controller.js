const ReaderService = require("../services/reader.service")
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



exports.createUnitPrice = async (req, res, next) => {
    try{
        const { surname, name, phoneNumber } = req.body;
        if(!surname || !name || !phoneNumber){
            next(new ApiError(400, "surname, name and  can not be emtpy"));
        }

        const readerService = new ReaderService(MongoDB.client);
        const documents = await readerService.create(req.body);
        res.status(201).json(documents);
    } catch(err){
        return next(new ApiError(500, "An error occurred while creating a unit price "));
    }

}

exports.findAll = async (req, res, next ) => {
    let documents = [];

    try{
        const readerService = new ReaderService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await readerService.findByName(name);
        }else{
            documents = await readerService.find({});
        }
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while finding the contact")
        );
    }

    return res.send(documents);
}