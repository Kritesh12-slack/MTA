// const express = require("express")
// const session = require("express-session")
// const flash = require("connect-flash")
// const connectDB = require("./db/db")
// const userModel = require("./models/user.model")

// const app = express()

// app.set("view engine","ejs")
// app.use(session({
//     resave : false,
//     saveUninitialized : false,
//     secret : "Kritesh"
// }))
// app.use(flash())
// app.use(express.static("public/"))
// connectDB()


// app.get('/',function(req,res){
//     req.flash("age",21)
//     req.flash("age2",22)
//     res.render('index');
// })

// app.get('/createUser1',async function(req,res){
//     try{const response =  await userModel.create({
//         username : "Kritesh",
//         nickname : "Kritu",
//         description : "SDE",
//         categories : ["Web","App"],
//     })
//     if(response.username === "Kritesh"){
//         res.send(response)
//     }}
//     catch{
//         res.send("Already Exists")
//     }
// })
// app.get('/createUser2',async function(req,res){
//     try{const response =  await userModel.create({
//         username : "Ritesh",
//         nickname : "Ritu",
//         description : "SDE2",
//         categories : ["Web","Cloud","App"],
//     })
//     if(response.username === "Ritesh"){
//         res.send(response);
//     }}
//     catch{
//         res.send("Already Exists ")
//     }
    
// })
// app.get('/createUser3',async function(req,res){
//     try{const response =  await userModel.create({
//         username : "Hitesh",
//         nickname : "Hitu",
//         description : "SDE3",
//         categories : ["DSA","Cloud","Web","App"],
//     })
//     if(response.username === "Hitesh"){
//         res.send(response)
//     }}
//     catch{
//         res.send("Already Exists")
//     }
// })

// app.get("/findUser",async function(req,res){
//     try {
//         // const regex = new RegExp("^k",'i')
//         const response = await userModel.find()
//         if(response){
//             res.send(response)
//         }
//     } catch (error) {
//         res.send("No user Found")
//     }
// })

// app.get("/deleteUser",async function(req,res){
//     const response = await userModel.deleteMany({username : {$exists : true}})
//     if(response.acknowledged){
//         res.send(response)
//     }
// })

// app.get('/checkAge2',function(req,res){
//     console.log(req.flash("age"),req.flash("age2"))
//     res.send("Check Terminal2")
// })


// app.listen(3000)

// ---------------------------------------------------------

const express = require('express')
const session = require('express-session')
const connectDB = require('./db/db')
const userModel = require('./models/user.model')
const passport = require('passport')
const localStrategy = require('passport-local')
const app = express()

app.set('view engine','ejs')

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "secKey"
}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.use(express.static('public/'))
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
connectDB()

passport.use(new localStrategy(userModel.authenticate()))

app.get('/',function(req,res){
    res.render('index')
})
app.get('/profile',isLoggedIn,function(req,res){
    res.render('profile')
})

app.post('/register',function(req,res){
    console.log('register');
    const {username,secret} = req.body; 
    const user = new userModel({
        username : username,
        secret : secret,
    })

    userModel.register(user,req.body.password)
        .then(function(registeredUser){
            passport.authenticate('local')(req,res,function(){
                res.redirect('/profile')
            })
        })

})

app.post('/login', passport.authenticate('local',{
    successRedirect : "/profile",
    failureRedirect : "/"
}) ,function(req,res){})

app.post('/logout',function(req,res){
    console.log('callled -------------------------------------->',req.user)
    req.logout((err,abc)=>{
        console.log(err,abc)
        
    })
    console.log('here---------------->')
    // res.render('index
    res.status(200).json({
        redirect:'/'
    })
    
})
app.get('/logout',function(req,res){
    console.log('callled -------------------------------------->',req.user)
    req.logout((err)=>{
        console.log(err)
        
    })
    console.log('here---------------->')
    res.redirect('/')
   
    
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/")
}

app.listen(3000)