const { ObjectId } = require("mongodb");
const Reader = require("../models/readers");

class ReaderService {
    constructor(client) {
        this.readerCollection = client.db().collection("readers");

    }

    async create(payload) {
        try{
            const reader  = new Reader({
                surname: payload.surname,
                name: payload.name,
                birthdate: payload.birthdate,
                gender: payload.gender,
                address: payload.address,
                phoneNumber: payload.phoneNumber,
            });

            const result = await this.readerCollection .insertOne(reader);
            return result.insertedId;
        } catch(error){
            throw new Error ("Couldn't create UnitPrice object  from " + JSON.stringify(error));
        }
    }

    async find(filter) {
        const cursor = await this.readerCollection.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.readerCollection.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
}



module.exports = ReaderService;