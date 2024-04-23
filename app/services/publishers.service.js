const { ObjectId } = require("mongodb");

class PublishersService {
    constructor(client) {
        this.Book = client.db().collection("publishers");
    }
}


module.exports = PublishersService;