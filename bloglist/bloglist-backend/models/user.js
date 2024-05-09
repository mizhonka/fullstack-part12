const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    name: String,
    passwordhash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordhash;
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
