const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

// const userSchema = new mongoose.Schema({
//     username : {
//         type : String,
//         unique : true
//     },
//     nickname : {
//         type : String,
//     },
//     description : {
//         type : String,
//     },
//     categories : {
//         type : Array,
//         default : []
//     },
// },{timestamps : true})

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : false
    },
    password : {
        type : String
    },
    secret : {
        type : String,
        required : true
    }
},{timestamps:true})

userSchema.plugin(plm)


const User = mongoose.model("User",userSchema)

module.exports = User