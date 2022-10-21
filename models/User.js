const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name must be more than 3 characters"],
        maxlength: [20, "First Name is too long"],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last Name must be more than 3 characters"],
        maxlength: [20, "Last Name is too long"],
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your password is too weak..."]
    }
},
{
    timestamps: true
});


userSchema.methods.verifyPassword = function(password) {
    console.log("password from User: " + password);
    console.log("password from Database: " + this.password);
    return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User;