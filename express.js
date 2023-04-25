const express = require("express");
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

async function main() {
    await connectDb();
    app.use(express.json())
    app.use("/api/contacts", require("./routes/contactRoutes"))
    app.use("/api/user", require("./routes/userRoutes"))
    app.use(errorHandler)


    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })

}

main()
