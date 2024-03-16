const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const response = await mongoose.connect("mongodb+srv://kritesh1:kritesh1@cluster0.572qjan.mongodb.net/testingBackend")
        if (response) {
            console.log("MongoDB Connected")
        }
    } catch (error) {
        console.log("Error")
    }
}

module.exports = connectDB