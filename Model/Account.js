const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    username: { type: String, required: true, unique: true }, // Thêm kiểu dữ liệu, bắt buộc, và duy nhất
    password: { type: String, required: true },
}, {
    collection: 'account'
});

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;
