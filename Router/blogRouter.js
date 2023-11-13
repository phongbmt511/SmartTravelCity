const express = require('express');
const router = express.Router();
const Blog = require('../Model/Blog');

// Route GET: Lấy tất cả các bài viết
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route GET: Lấy một bài viết theo ID
router.get('/blogs/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Middleware: Hàm trung gian để lấy bài viết theo ID
async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.blog = blog;
    next();
}

// Route POST: Thêm một bài viết mới
router.post('/blogs', async (req, res) => {
    const blog = new Blog({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        cardImage: req.body.cardImage,
        author: req.body.author,
        profileImage: req.body.profileImage
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route PUT: Cập nhật một bài viết
router.put('/blogs/:id', getBlog, async (req, res) => {
    if (req.body.category != null) {
        res.blog.category = req.body.category;
    }
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.description != null) {
        res.blog.description = req.body.description;
    }
    if (req.body.cardImage != null) {
        res.blog.cardImage = req.body.cardImage;
    }
    if (req.body.author != null) {
        res.blog.author = req.body.author;
    }
    if (req.body.profileImage != null) {
        res.blog.profileImage = req.body.profileImage;
    }

    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route DELETE: Xóa một bài viết
router.delete('/blogs/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Xóa bài viết thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xuất router để sử dụng trong ứng dụng của bạn
module.exports = router;
