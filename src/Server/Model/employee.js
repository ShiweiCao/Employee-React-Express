const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSchema = new Schema({
    name : String,
    phone : String,
    email : String,
    manager_id : {
        type: Schema.Types.ObjectId,
        ref : 'Employee'
    },
    subordinate: [],
});

module.exports = mongoose.model('Employee', EmpSchema);