const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// call .env
require('dotenv').config();
// route
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');

const app = express();

// connect db
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT_STRING).then(() => console.log('db connected successfull!')).catch((err) => console.log(err));

// middleware setting
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// กำหนดตำแหน่งที่อนูญาตให้ร้องขอข้อมูล
app.use(cors());
// ดัก request log request
app.use(morgan("dev"));

// use routes
app.use('/blog',blogRoute);
app.use('/blog',authRoute);


// setting server port
const port = process.env.PORT || 5080;
app.listen(port,() => console.log('server start at port',port))