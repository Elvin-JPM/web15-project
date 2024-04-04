<<<<<<< HEAD
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
       username: { type: String, index: true, unique:true},
       email: { type: String, index:true, unique:true},
       password: String,
       active: Boolean,
       activeSocketIO: Boolean,
       resetPasswordToken : String
    }
);

// Password Encryption
userSchema.statics.hashPassword = function(originalPassword) {
    return bcrypt.hash(originalPassword,7);
}

// Compare hashed password and original password in login
userSchema.methods.comparePassword = function(originalPassword) {
    return bcrypt.compare(originalPassword, this.password)
}

const User = mongoose.model('User', userSchema);
=======
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
       username: { type: String, index: true, unique:true},
       email: { type: String, index:true, unique:true},
       password: String,
       active: Boolean,
       activeSocketIO: Boolean,
       resetPasswordToken : String
    }
);

// Password Encryption
userSchema.statics.hashPassword = function(originalPassword) {
    return bcrypt.hash(originalPassword,7);
}

// Compare hashed password and original password in login
userSchema.methods.comparePassword = function(originalPassword) {
    return bcrypt.compare(originalPassword, this.password)
}

const User = mongoose.model('User', userSchema);
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
module.exports = User;