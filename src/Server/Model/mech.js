const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSchema = new Schema({
    name : String,
    phone : String,
    email : Number,
    manager : String,
    subordinate: [],
});

module.exports = mongoose.model('Emp', EmpSchema);