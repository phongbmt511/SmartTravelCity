const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routerUser = require('./Router/accountRouter');
const newLocal = './Router/tourRouter';
const routerTour = require(newLocal);
const routerBlog = require('./Router/blogRouter');


const app = express();
const bodyParser = require('body-parser');

const url = "mongodb+srv://project:project@cluster0.fd17rr3.mongodb.net/dbtravel";

async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to mongoose");
    } catch (error) {
        console.error(error);
    }
}
connect();

app.use(bodyParser.urlencoded({ extended: false }));
// parser application/json
app.use(bodyParser.json());
app.use('/Public', express.static(path.join(__dirname, '/Public')));
app.use('/Views', express.static(path.join(__dirname, '/Views')));
app.set("view engine", 'ejs');
app.set("views", "./Views")

app.get('/', (req, res) => {
    res.render('Login', req.query);
});

app.get('/home', (req, res) => {
    res.render('Home', req.query);
});
app.get('/blog', (req, res) => {
    try {
        res.render('Blog', req.query);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/tours', (req, res) => {
    try {
        res.render('Tours', req.query);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/register', (req, res) => {
    try {
        res.render('Register', req.query);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/contact', (req, res) => {
    try {
        res.render('Contact', req.query);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/detail', (req, res) => {
    try {
        const tourId = req.query.id;
        res.render('DetailTour', { tourId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/services', (req, res) => {
    try {
        res.render('Services', req.query);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.use('/api', routerTour);
app.use('/api/account', routerUser);
app.use('/api', routerBlog)
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
