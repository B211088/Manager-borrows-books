const { ObjectId } = require("mongodb");
const Book = require("../models/books");
const Publishers = require("../models/publishers");
class BookService {
    constructor(client) {
        this.bookCollection = client.db().collection("books");
        this.publishersCollection = client.db().collection("publishers");
    }

    async create(bookData) {
        try {
            
            const existingPublishers = await this.publishersCollection.findOne({
                name: bookData.publishers.name,
                address: bookData.publishers.address
            });

            let publishersId;

            if(existingPublishers){
                publishersId = existingPublishers._id;
            } else {
                const publishers = new Publishers({
                    name: bookData.publishers.name,
                    address: bookData.publishers.address
                })

                const result =  await this.publishersCollection.insertOne(publishers);
                publishersId = result.insertedId;
            }


            const newBook = new Book({
                title: bookData.title,
                price: bookData.price,
                quanlity: bookData.quanlity,
                publishingYear: bookData.publishingYear,
                source: bookData.source, 
                imageUrl: bookData.imageUrl,
                publishers: publishersId,
            });

            await this.bookCollection.insertOne(newBook);


            return "create new book successfully";

        } catch (error) {

        }

    }

    async update(id, bookData) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const newBook = bookData;

        const result = await this.bookCollection.findOneAndUpdate(
            filter,
            { $set: newBook },
            { returnDocument: "after" }
        );
        return "update book successfully";
    }

    async find(filter) {
        const cursor = await this.bookCollection.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.bookCollection.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }



    async delete(id){
        const result = await this.bookCollection.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        
        return "delete book successfully";
        // if (result && result.value) {
        //     return result.value; 
        // } else {
        //     return null; 
        // }
    }


}

module.exports = BookService;
