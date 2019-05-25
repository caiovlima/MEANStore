const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product.find({
        active: true
    }, 'name price stock');
    return res;
}


exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.create = async(body) => {
    var product = new Product(body);
    await product.save();
}

exports.update = async(id, body) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                name: body.name,
                description: body.description,
                price: body.price,
                stock: body.stock,
                departments: body.departments
            }
        });
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}