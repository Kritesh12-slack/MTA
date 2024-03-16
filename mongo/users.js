const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://kritesh1:kritesh1@cluster0.572qjan.mongodb.net/theAppOne")

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    name: String,
    age: Number
})
module.exports = mongoose.model("User", userSchema)