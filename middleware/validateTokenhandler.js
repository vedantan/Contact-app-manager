const asynchandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asynchandler(async (req, resp, next) => {
    let token;
    let authHeaders = req.headers.Authorization || req.headers.authorization;
    console.log({ authHeaders })
    if (authHeaders || authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
            if (err) {
                resp.status(401);
                throw new Error("user is not authorised")
            }
            req.user = decoded.user;
            next();
        })
        if (!token) {
            resp.status(401);
            throw new Error("user is not authorized or token is expired")
        }
    }
})

module.exports = validateToken