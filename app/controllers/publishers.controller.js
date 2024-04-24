const PublishersService = require("../services/publishers.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.createPublishers = async (req, res, next ) => { 
    try {
        const publishersService = new PublishersService(MongoDB.client);
        const document = await publishersService.create(req.body);
        return res.json(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred creating the book")
        );
    }
}

exports.findAllPublishers= async (req, res, next ) => {
    let documents = [];

    try{
        const publishersService = new PublishersService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await publishersService.findByName(name);
        }else{
            documents = await publishersService.find({});
        }

        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while finding the contact")
        );
    }


}

exports.deletePublisher = async  (req, res, next) => {
    try{
        const publishersService= new PublishersService(MongoDB.client);
        const document = await publishersService.delete(req.params.id);
        return res.send({message: "Contact was deleted successfully", data: document});
    }catch(error){
        return next (
            new ApiError(500, `Error deleting contact with id=${req.params.id}`)
        );
    }
}
