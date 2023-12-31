const express = require('express');
const AccountModel = require('../Model/Account');
const router = express.Router();
// Xử lý yêu cầu GET để hiển thị trang contact
router.get('/contact', (req, res, next) => {
    res.render('Contact');
});
//Xử lý yêu cầu GET để hiển thị trang đăng ký
router.get('/register', (req, res, next) => {
    res.render('Register');
});
router.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    AccountModel.findOne({
        username: username
    })
        .then(data => {
            if (data) {
                res.json('User nay da ton tai ')
            } else {
                return AccountModel.create({
                    username: username,
                    password: password
                })
            }
        })
        .then(data => {
            res.json('Tạo tài khoản thành công');
        })
        .catch(err => {
            console.error(err); // Log the error for debugging
            res.status(500).json('Tạo tài khoản thất bại');
        });
});


router.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    AccountModel.findOne({
        username: username,
        password: password
    })

        .then(data => {
            if (data) {
                res.json('login thanh cong')
            } else {
                res.status(400).json('account ko dung')
            }
        })
        .catch(err => {
            res.status(300).json('co loi ben server')
        })
})

// lay du lieu tu db
router.get('/login', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.status(500).json('loi server')
        })
})
// them moi du lieu vao db
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    AccountModel.create({
        username: username,
        password: password
    })
        .then(data => {
            res.json('create account thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
})
// update du lieu trong db
router.put('/login/:id', (req, res, next) => {
    const id = req.params.id
    const newUsername = req.body.newPassword
    const newPassword = req.body.newPassword
    AccountModel.findByIdAndUpdate(id, {
        username: newUsername,
        password: newPassword
    })
        .then(data => {
            res.json('update thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
})
// delete du lieu trong db
router.delete('/login/:id', (req, res, next) => {
    const id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
        .then(data => {
            res.json('delete thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
})



module.exports = router;

