const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
let AccountActivationSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        sparse: true
    },

    token: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

AccountActivationSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });

AccountActivationSchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    delete object.deleted;
    return object;
});

module.exports = mongoose.model('AccountActivation', AccountActivationSchema, 'accountactivations');
