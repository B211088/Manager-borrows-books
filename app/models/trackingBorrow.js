const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackingBorrowSchema = new Schema ({
    reader:{
        type: Schema.Types.ObjectId,
        ref: 'readers',
    },
    book:{
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
});

module.exports = mongoose.model('trackingborrows', trackingBorrowSchema);