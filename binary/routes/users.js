const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://kritesh:KrituShrivastava@cluster0.y5acleq.mongodb.net/binaryDB")

const userSchema = mongoose.Schema({
  username : String,
  name : String,
  age : Number,
})

module.exports = mongoose.model("User",userSchema)
