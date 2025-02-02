
const jwt = require('jsonwebtoken');
// ตรวจสอบโทเคน
exports.auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token)return res.json({err:'กรุณาเข้าสู่ระบบ'}).status(401);
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.auth = decode;
        next();
    } catch (error) {
        res.json({err:'sommething went wrong at server side'});
        console.log(error);
    }
}