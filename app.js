const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routers/books.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.get("/", (req, res) => {
    res.json({message: "welcome  to manager borrows books!"});
  });
  
app.use((req, res, next) => {
    return next (new ApiError(404, "resourer not found"));
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500 ).json(
        {
            message: err.message || "Internal Server Error",
        }
    )
})


module.exports = app;