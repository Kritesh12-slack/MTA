const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

app.set("view engine","ejs")
app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized : false,
    secret : "Secret"
}))
app.use(express.static("public/"))



// sessions
app.get('/',(req,res)=>{
    req.session.ban = true
    res.send("server is connected")
})

app.get('/check',(req,res)=>{
    if(req.session.ban === true){
        res.send("Your Banned")
    }
    else{
        res.send("Not Banned")
    }
})

app.get('/removeBan',(req,res)=>{
    req.session.ban = false
    res.send("Banned Removed")
})



// cookie
app.get('/cookieSet',(req,res)=>{
    res.cookie("age",21)
    res.send("Cookie successfully set")
})

app.get('/cookiesShow',(req,res)=>{
    res.send(req.cookies)
})

app.get('/clearCookies',(req,res)=>{
    res.clearCookie("age")
    res.send("Clear hogyi")
})

app.listen(3000)