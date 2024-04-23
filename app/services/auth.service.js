
const { ObjectId } = require("mongodb");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



class AuthService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    async createUser(user) {
        try{
            const existingUser =  await this.User.findOne({username: user.username});
            if(existingUser){
                return existingUser
            }
            
            const hasedPassword = await argon2.hash(user.password);
    
            const newUser = new User({
                username: user.username,
                password: hasedPassword
            });
    
            await newUser.save();
    
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET, {expriesIn: "1d"});
            return accessToken;
        } catch(error){}
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }


}




module.exports = AuthService;