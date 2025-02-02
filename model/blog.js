// connect cloud database
const mongoose = require('mongoose');

// สร้าง Schema
const schema = mongoose.Schema({
    // หัวข้อ         
    title:{type:String,required:true},
    // content
    content:{type:{},required:true},
    // ผู้เขียน
    author:{type:String,default:"Admin"},
    // 
    slug:{type:String,lowercase:true,unique:true}
    
    // จัดเก็บช่วงเวลาที่มีการจัดการกับข้อมูล 
},{timestamps:true})

// ส่งออกโมเดลและ Schema
module.exports = mongoose.model('blogs',schema);

