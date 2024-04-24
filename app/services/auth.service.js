
const { ObjectId } = require("mongodb");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



class AuthService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    generateRandomSixDigits() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    // Hàm để tạo mã mới
    generateCustomCode() {
        return "B2" + this.generateRandomSixDigits();
    }

    // Hàm để tạo số ngẫu nhiên 8 chữ số
    generateRandomEightDigits() {
        return Math.floor(10000000 + Math.random() * 90000000);
    }

    // Hàm để tạo mật khẩu mới
    generatePassword() {
        return "nv" + this.generateRandomEightDigits();
    }

    // Hàm để kiểm tra xem mã đã tồn tại trong cơ sở dữ liệu hay chưa
    async isCustomCodeUnique(code) {
        const existingUser = await this.User.findOne({ employeeID: code });
        return !existingUser;
    }

    // Hàm để tạo một mã duy nhất
    async generateUniqueCustomCode() {
        let code = this.generateCustomCode();
        while (!(await this.isCustomCodeUnique(code))) {
            code = this.generateCustomCode();
        }
        return code;
    }

    // Hàm để tạo một mật khẩu duy nhất
    async generateUniquePassword() {
        let password = this.generatePassword();
        const existingUser = await this.User.findOne({ password: password });
        if (existingUser) {
            password = this.generatePassword();
        }
        return password;
    }

    // User register
    async createUser(userData) {
        try {
            const password = await this.generateUniquePassword();

            const hashedPassword = await argon2.hash(password);

            const employeeID = await this.generateUniqueCustomCode();
            const newUser = new User({
                employeeID: employeeID,
                password: hashedPassword,
                fullName: userData.fullName,
                position: userData.position,
                address: userData.address,
                phoneNumber: userData.phoneNumber,
            });
    
            await this.User.insertOne(newUser);
    
            const accessToken = jwt.sign({
                userId: newUser._id
            },
                process.env.ACCESS_TOKEN_SECRET
            );

            return { accessToken, employeeID, password };

        } catch(error) {
            return error;
        }
    }

    // User login
    async login(userData) {
        try {
            const user = await this.User.findOne({ employeeID: userData.username });
    
            if (!user) {
                return "Incorrect username";
            }
    
            const passwordValid = await argon2.verify(user.password, userData.password);
    
            if (!passwordValid) {
                return "Incorrect password";
            }
    
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            
            return {accessToken};
    
        } catch (error) {
            console.error(error); // Log lỗi ra để xem vấn đề
            return false;
        }
    }
      


    async updatePassword(id, userData) {
        try {
            const filter = {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            };


            const newPassword = await argon2.hash(userData.newPassword);

            const result = await this.User.findOneAndUpdate(
                filter,
                { $set: {password: newPassword} },
                { returnDocument: "after" }
            );
            return result.value;
        } catch (error){
            console.error(error); 
            return null;
        }
    }
    
    // async forgetPassword(userData) {
    //     try {
    //         const { username, newPassword } = userData;
    
    //         // Kiểm tra xem mật khẩu mới đã được cung cấp không
    //         if (!newPassword) {
    //             return "Please enter a new password";
    //         }
    
    //         // Tìm người dùng trong cơ sở dữ liệu bằng username
    //         const user = await this.User.findOne({ username });
    //         if (!user) {
    //             return "Incorrect username or password";
    //         }
    
    //         // Mã hóa mật khẩu mới
    //         const hashedPassword = await argon2.hash(newPassword);
    
    //         // Cập nhật mật khẩu mới của người dùng trong cơ sở dữ liệu
    //         const userId = user._id;
    //         const filter = {
    //             _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
    //         };
    //         const result = await this.User.findOneAndUpdate(
    //             filter,
    //             { $set: { password: hashedPassword } },
    //             { returnDocument: "after" }
    //         );
    
    //         // Kiểm tra xem kết quả đã được trả về hay không
    //         if (!result) {
    //             throw new Error("Failed to update password");
    //         }
    
    //         return "Password updated successfully";
    
    //     } catch (error) {
    //         console.error(error); 
    //         throw error;
    //     }
    // }
    
    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }


}




module.exports = AuthService;