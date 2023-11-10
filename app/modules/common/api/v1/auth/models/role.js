const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
let RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        set: v => v.toLowerCase().replace(/[\W]/g, '_')
    },

    display_name: {
        type: String,
        required: true
    },

    description: String,
}, {
    timestamps: true
});

RoleSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });

RoleSchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    delete object.deleted;
    return object;
});

module.exports = mongoose.model('Role', RoleSchema, 'roles');
