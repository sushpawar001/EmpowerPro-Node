const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name: String,
    email: String,
    salary: Number,
}, { timestamps: true });

const empModel = mongoose.model('employees', empSchema);

module.exports = empModel;
