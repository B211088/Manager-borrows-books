const BookService = require("../services/books.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next ) => {
    if(!req.body?.tenSach) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const documnet = await bookService.create(req.body);
        return res.send(documnet);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred creating the book")
        );
    }
}

exports.findAll = async (req, res, next ) => {
    let documents = [];

    try{
        const bookService = new BookService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await bookService.findByName(name);
        }else{
            documents = await bookService.find({});
        }
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while finding the contact")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if(!document){
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }catch(error){
        return next (
            new ApiError(
                500,
                 `Error retrieving contact with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(
            new ApiError(400, "Data to update can not be empty")
        );
    }

    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if(!document){
            return next(
                new ApiError(404, "Contact not found")
            );
        }
        return res.send({message: "Contact was updated successfully"});
    }catch(error){
        return next (
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
}

exports.delete = async  (req, res, next) => {
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if(!document){
            return next(
                new ApiError(404, "Contact not found")
            );
        }
        return res.send({message: "Contact was deleted successfully"});
    }catch(error){
        return next (
            new ApiError(500, `Error deleting contact with id=${req.params.id}`)
        );
    }
}
exports.deleteAll = async (_req, res, next) => {
    try{
        const bookService = new BookService(MongoDB.client);
        const deleteCount = await bookService.deleteAll();
        return res.send({message: `${deleteCount} Contact were deleted successfully`});
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while deleting all contact")
        );
    }
}