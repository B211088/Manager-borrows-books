const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeechema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    fullName:{
        type:String,
        required:true
    },
    position:{
        type:String,
    },
    address:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    createAt:{
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('employees', employeechema);