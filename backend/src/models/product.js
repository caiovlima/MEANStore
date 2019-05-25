const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }]

}, {versionKey: false});

module.exports = mongoose.model("Product", productSchema);

