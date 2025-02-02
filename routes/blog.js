const express = require('express');
const router = express.Router();

// middleware
const {auth} = require('../middleware/auth');
// controller
const {createBlog,getAllBlogs,getSingle,deleteBlog,updateBlog} = require('../controllers/blog');

// insert blog
router.post('/add',auth,createBlog);
// get all
router.get('/getall',getAllBlogs);
// get by slug
router.get('/getblog/:slug',getSingle);
// delete blog
router.delete('/delblog/:slug',auth,deleteBlog);
// update blog
router.put('/update/:slug',auth,updateBlog);

module.exports = router;