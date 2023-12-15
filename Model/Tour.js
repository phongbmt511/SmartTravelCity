const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const tourSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }

}, {
    collection: 'tour'
});

const tourModel = mongoose.model('tour', tourSchema);

module.exports = tourModel;

