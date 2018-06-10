const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSchema = new Schema({
    name : String,
    phone : String,
    email : String,
    manager : {
        type: Schema.Types.ObjectId,
        ref : 'manager'
    },
    subordinate: [],
});

module.exports = mongoose.model('Employee', EmpSchema);