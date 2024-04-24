const BookService = require("../services/books.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createBook = async (req, res, next ) => {
    const { title } = req.body;
    if(!title) {
        return next(new ApiError(400, "Title can not be empty"));
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

exports.updateBook = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            new ApiError(400, "Data to update cannot be empty")
        );
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        return res.json({message: "Book updated successfully", data: document} );
    } catch (error) {
        return next(
            new ApiError(500, `Error updating book with id=${req.params.id}: ${error.message}`)
        );
    }
}

exports.deleteBook = async  (req, res, next) => {
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        return res.send({message: "Contact was deleted successfully"});
    }catch(error){
        return next (
            new ApiError(500, `Error deleting contact with id=${req.params.id}`)
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



