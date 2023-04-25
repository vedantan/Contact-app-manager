const { constants } = require("../constants")
const errorHandler = (err, req, resp, next) => {
    const statuscode = resp.statuscode ? resp.statuscode : 500;
    resp.json({ message: err.message, stackTrace: err.stack })

    switch (statuscode) {
        case constants.VALIDATION_ERROR:
            resp.send({ title: "validation Failed", message: err.message, stackTrace: err.stack })
            break;

        case constants.UNAUTHORIZED:
            resp.send({ title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack })
            break;

        case constants.FORBIDEN:
            resp.send({ title: "FORBIDEN", message: err.message, stackTrace: err.stack })
            break;

        case constants.NOT_FOUND:
            resp.send({ title: "Not Found", message: err.message, stackTrace: err.stack })
            break;

        case constants.SERVER_ERROR:
            resp.send({ title: "SERVER_ERROR", message: err.message, stackTrace: err.stack })
            break;

        default:
            console.log("no Error, All fine")
            break;
    }
}

module.exports = errorHandler;