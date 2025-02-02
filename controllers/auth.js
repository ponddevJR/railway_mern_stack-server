const jwt = require('jsonwebtoken');

exports.login = async (req,res) => {
    try {
        const {username,password} = req.body;
        if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'});
            return res.json({token,user:username});
        }else{
            res.json({err:'ชื่อผู้ใช่งานหรือรหัสผ่านไม่ถูกต้อง'}).status(400);
        }
    } catch (error) {
        res.json({err:'something went wrong at server side'}).status(500);
        console.log(error);
    }
}