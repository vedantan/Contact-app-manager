const asynchandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// @desp register the user
// @ route *****************POST******************* /api/user/register
// @access public

const registerUser = asynchandler(async (req, resp) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        resp.status(404)
        // throw new Error("All fields are madatory")
    }

    const useravailable = await User.findOne({ email });
    if (useravailable) {
        resp.status(400)
        throw new Error("user already registered")

    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10)
    console.log("Hashed password: ", hashpassword)

    const user = await new User({
        username,
        email,
        password: hashpassword
    })

    console.log(`user added:  ${user}`)
    if (user) {
        resp.status(201).json({ _id: user.id, email: user.email })
    } else {
        resp.status(400)
        // throw new Error("User data is not valid")
    }
    user.save()
    resp.send(user)
})


// @desp login the user
// @ route ****************POST***************** /api/user/register
// @access public
const loginUser = asynchandler(async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400)
        throw new Error("All fields are mandotary")
    }

    const user = await User.findOne({ email })

    // to compare password with hashpassword
    /////////////////////////(password from the user in the request body , password of the user)
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "15m" })
        resp.status(200).json({ accesstoken })
    } else {
        resp.status(401);
        throw new Error("Invalid username or password")

    }
})


// @desp Current user information 
// @ route *************GET************* /api/user/register
// @access public
const currentUser = asynchandler(async (req, resp) => {
    resp.json(req.user)
})


module.exports = { registerUser, loginUser, currentUser };
