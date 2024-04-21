const app = require('./app');
const config = require("./app/config")
const MongoDB = require("./app/utils/mongodb.util")





async function startServer() {
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Connected to MongoDB");
        
        const PORT = config.app.port;
        await MongoDB.connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannit connect to the database ", error);
        process.exit();
    }
}


startServer();