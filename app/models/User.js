const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    // fullName:{
    //     type:String,
    //     required:true
    // },
    // position:{
    //     type:String,
    // },
    // address:{
    //     type:String,
    // },
    // phoneNumber:{
    //     type:String,
    // }
});


module.exports = mongoose.model('users', UserSchema);