const express = require("express")
const app = express()
const userModel = require("./users")
const session = require("express-session")

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "Backend"
}))

app.get('/', function (req, res) {
    res.send("hello")
})

app.get("/createUser", async function (req, res) {
    if (userModel.findOne({ username: "Kritesh" })) {
        res.send("Already Exists")
    }
    else {
        const response = await userModel.create({
            username: "Kritesh",
            name: "Kritu",
            age: 18
        })
        res.send(response)
        console.log(response)
    }
})

app.get("/deleteAll", async function (req, res) {
    const response = await userModel.deleteMany({ username: "Kriteh" })
    res.send(response)
})
app.listen(3000)