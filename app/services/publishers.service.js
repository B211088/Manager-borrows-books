const { ObjectId } = require("mongodb");
const Publisher = require("../models/publishers")
class PublishersService {
    constructor(client) {
        this.publishersCollection = client.db().collection("publishers");
    }

    async create(payload){
        try{
            const existingPublishers = await this.publishersCollection.findOne({name: payload.name})
            if(existingPublishers){
                return "publishers already exists";
            }
            const publisher = new Publisher({
                name: payload.name,
                address: payload.address
            })
            const result = await this.publishersCollection.insertOne(publisher);
            return result.ops[0];

        } catch (error) {
            throw new Error(`Error creating publisher: ${error.message}`);
        }
    }

    async find(filter) {
        const cursor = await this.publishersCollection.find(filter);
        return await cursor.toArray();
    }
    
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    
    async findById(id) {
        return await this.publishersCollection.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async delete(id){
        const result = await this.publishersCollection.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        

        if (result && result.value) {
            return result.value; 
        } else {
            return null; 
        }
    }

}



module.exports = PublishersService;