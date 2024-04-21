const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("books");
    }

    extractBookData(payload) {
        const book = {
            tenSach: payload.tenSach,
            donGia: payload.donGia,
            soQuyen: payload.soQuyen,
            namXuatBan: payload.namXuatBan,
            maNXB: payload.maNXB,
            tacGia: payload.tacGia,
            anhBia: payload.anhBia
        };

        // Loại bỏ các trường có giá trị undefined
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async create(payload) {
       const book = this.extractBookData(payload);
        const result = await this.Book.insertOne(book); // Insert new contact
        return result.ops[0];
    }

    async find(filter) {
        const cursor = await this.Book.find(filter);
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

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll(){
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = BookService;
