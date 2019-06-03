const mongoose = require('mongoose');
const Department = mongoose.model('Department');

exports.get = async() => {
    const res = await Department.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Department
        .findById(id);
    return res;
}

exports.create = async(body) => {
    var department = new Department(body);
    await department.save();
}

exports.update = async(id, body) => {
    await Department
        .findOneAndUpdate(id, {
            $set: {
                name: body.name
            }
        });
}

exports.delete = async(id) => {
    await Department
        .findOneAndRemove(id);
}