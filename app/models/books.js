const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quanlity:{
        type: Number,
        required: true,
        default: 1
    },
    publishingYear:{
        type: Number,
    },
    source:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    publisher:{
        type: Schema.Types.ObjectId,
        ref: 'publishers'
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("books", BookSchema);