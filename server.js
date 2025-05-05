const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const employeeRoutes = require('./routes/employeeRoutes')
const ejs = require('ejs')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
const Student = require('./models/Student')


dotEnv.config()
const app = express()
const PORT = process.env.PORT
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');

// Allow requests from any origin (For development purposes)
app.use(cors());

mongoose.connect(process.env.dburl)
.then(()=>{
    console.log("CONNECTED TO DBBBBBBB")
})
.catch((error)=>{
    console.log(error)
})

const store = new MongoDBStore({
    uri: process.env.dburl,
    collection: 'mySessions'
  });

app.get("/reg",(req,res)=>{
    res.render('regPage')
})
app.get("/login",(req,res)=>{
    res.render('loginPage')
})
app.get("/home",(req,res)=>{
    res.render('homePage')
})
app.post('/register', async (req, res) => {
    try {
        const {studentId,Studentname,Studentfathername,studentemail,studentphoneNumber} = req.body
        const stu= new Student({
            studentId,Studentname,Studentfathername,studentemail,studentphoneNumber
        })
        await stu.save()
        res.redirect('/login')
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.use('/employees',employeeRoutes)
app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON ${process.env.PORT}`)
})


