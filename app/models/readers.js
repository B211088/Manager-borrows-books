const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const unitPriceSchema  = new Schema({
    surname:{
        type: String,
    },
    name:{
        type: String,
    },
    birthdate:{
        type: Date,
    },
    gender:{
        type: String,
        enum: ["Male", "Female", "Another"],
    },
    address:{
        type: String,
    },
    phoneNumber:{
        type: Number,
    }

});

module.exports = mongoose.model('readers', unitPriceSchema);