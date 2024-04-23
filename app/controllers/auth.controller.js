const AuthService = require("../services/auth.service")
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.registerUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username ||!password) {
        return next(new ApiError(400, "Please provide a username and password"));
    }

    try{
        const authService = new AuthService(MongoDB.client);
        const document = await authService.createUser(req.body);
        return res.send(document)
    } catch(error){
        return next(new ApiError(500, "An error occurred during registration"));
    }
}

exports.findAll = async (req, res, next ) => {
    let documents = [];

    try{
        const authService = new AuthService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await authService.findByName(name);
        }else{
            documents = await authService.find({});
        }
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while finding the contact")
        );
    }

    return res.send(documents);
}