const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true }) //o timestamps é para as propriedades 'createdAt' e 'updatedAt'

const User = mongoose.model('User', UserSchema)
module.exports = User