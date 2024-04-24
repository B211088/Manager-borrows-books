const AuthService = require("../services/auth.service")
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.registerUser = async (req, res, next) => {

    try{
        const authService = new AuthService(MongoDB.client);
        const document = await authService.createUser(req.body);
        return res.json(
            {
                success: true, 
                message: "Register successfuly",
                document,
            }
        );
    } catch(error){
        return next(new ApiError(500, "An error occurred during registration"));
    }
}


exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username ||!password) {
        return next(new ApiError(400, "Please provide a username and password"));
    }
    try{
        const authService = new AuthService(MongoDB.client);
        const document = await authService.login(req.body);
        return res.json(
            {
                success: true,
                message: "Login successfuly" ,
                document
            }
        );
        
    }catch(error){
        return next(new ApiError(500, "An error occurred during login"));
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

exports.updatePassword = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(
            new ApiError(400, "Data to update can not be empty")
        );
    }

    try{
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword) {
            throw new ApiError(400, "old password is required and new password is required");
        }

        const authService = new AuthService(MongoDB.client);
        const document = await authService.updatePassword(id , req.body);
        return res.send({message: "Contact was updated successfully", data: document});
    }catch(error){
        return next (
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
}

// exports.forgetPassword = async (req, res, next) => {
//     const { username } = req.body;
//     if(!username) return next(new ApiError(400, "Please enter a username"));

//     try{
//         const authService = new AuthService(MongoDB.client);
//         const document = await authService.forgetPassword(req.body);
//         return res.json(
//             {message: "Change password successfully"}
//         );
//     } catch(error) {
//         return next(
//             new ApiError(400, "An error occurred while changing the password")
//         );
//     }
// }
