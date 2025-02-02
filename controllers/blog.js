// slugify ทำหน้าที่เพิ่มขีดให้ช่องว่างที่มีอยู่ในข้อความ ใช้สำหรับสร้าง url
const slugify = require('slugify');
// uuid for slug
const {v4:uuidv4} = require('uuid');

// blog model connect blogDB
const blogModel = require('../model/blog');

// บันทึกข้อมูลบทความ
exports.createBlog = async (req,res) => {
    try {
        const {title,content} = req.body;
        let {author} = req.body;
        // validate value
        if(!title || !content)return res.json({err:'โปรดกรอกข้อมูลให้ครบถ้วน'}).status(400);
        // แปลง title เป็น Slug
        let slug = slugify(title);
        // ตรวจสอบ slug ภาษาไทย(ค่าว่าง)
        if(!slug)slug = uuidv4();
        // ตรวจสอบ slug ซ้ำ
        const slugRepeat = await blogModel.findOne({slug});
        if(slugRepeat)return res.json({err:'มีชื่อบทความนี้แล้ว'}).status(400);
        // ตรวจสอบว่าได้ป้อนชื่อผู้เขียนหรือไม่
        if(!author)author = 'Admin';

        // บันทึกข้อมูล
        const newBlog = new blogModel({
            title,content,author,slug
        });
        await newBlog.save();
        res.status(200).json({mes:'บันทึกข้อมูลแล้ว'});
    } catch (error) {
        res.json({err:'some thing went wrong at server side'}).status(500);
        console.log(error);
    }
}

// แสดงข้อมูลบทความทั้งหมด
exports.getAllBlogs = async (req,res) => {
    try {
        const blogs = await blogModel.find();
        res.json({blogs}).status(200);
    } catch (error) {
        res.json({err:'some thing went wrong at server side'}).status(500);
        console.log(error);
    }
}

// ดึงข้อมูลด้วย slug
exports.getSingle = async (req,res) => {
    try{
        const slug = req.params.slug;
        const blog = await blogModel.findOne({slug});
        if(blog){
            res.json({blog}).status(200);
        }else{
            res.json({err:'ไม่พบบทความ'}).status(400);
        }
    }catch(err){
        res.json({err:'some thing went wrong at server side'}).status(500);
        console.log(err);
    }
}

// ลบบทความ
exports.deleteBlog = async (req,res) => {
    try {
        const {slug} = req.params;
        await blogModel.findOneAndDelete({slug});
        res.json({mes:'ลบบทความแล้วเรียบร้อย'}).status(200);
    } catch (error) {
        res.json({err:'some thing went wrong at server side'}).status(500);
        console.log(error);
    }
}

// อัปเดตบทความ
exports.updateBlog = async (req,res) => {
    try {
        // ดึง slug จาก params
        const {slug} = req.params;
        // ข้อมูลที่ส้งมาจากหน้าบ้าน
        const {title,content} = req.body;
        let {author} = req.body;
        // จัดการค่าว่าง
        if(!title || !content)return res.json({err:'กรุณากรอกข้อมูลให้ครบถ้วน'}).status(400);
        if(!author)author = 'Admin';
        // อัปเดตข้อมูล
        await blogModel.findOneAndUpdate({slug},{title,content,author},{new:true});
        res.json({mes:'อัปเดตบทความแล้ว'}).status(200);
    } catch (error) {
        res.json({err:'some thing went wrong at server side'}).status(500);
        console.log(error);
    }
}