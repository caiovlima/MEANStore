const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {versionKey: false});

module.exports = mongoose.model("Department", departmentSchema);