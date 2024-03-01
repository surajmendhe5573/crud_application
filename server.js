const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const mongoose= require('mongoose')
const dotenv= require('dotenv')
require('dotenv').config();
const app = express();

app.use(bodyparser.urlencoded({ extended : true}))  // middleware

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000
const mongoUrl = process.env.MONGODB_URL;

// log requests
app.use(morgan('tiny'));


// const mongoUrl= 'mongodb://localhost:27017/abs';
mongoose.connect(mongoUrl).then(()=>{
    console.log('mongodb is connected');
})

// parse request to body-parser


// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});