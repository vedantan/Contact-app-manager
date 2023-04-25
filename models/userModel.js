const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "please enter name"]
    },
    email: {
        type: String,
        require: [true, "please enter email"],
        unique: [true, "email address already taken"]
    },
    password: {
        type: String,
        require: [true, "please add the user password"]
    }
})

module.exports = mongoose.model("User", userSchema);