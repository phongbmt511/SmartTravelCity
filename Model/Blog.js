const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const blogSchema = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    cardImage: { type: String, required: true },
    author: { type: String, required: true },
    profileImage: { type: String, required: true }
}, {
    collection: 'blog'
});

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;