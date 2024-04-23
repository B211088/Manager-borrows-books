const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const unitPrice = require("./unitPrice")
const books = require("./books");

const bookBorrowingSchema = new Schema ({
    unitPrice:{
        type: Schema.Types.ObjectId,
        ref: 'unitPrice',
    },
    books:{
        type: Schema.Types.ObjectId,
        ref: 'books',
    },
    borrowDate:{
        type: Date,
        default: Date.now,
        unique:true,
    },
    returnDate:{
        type: Date,
    }
})