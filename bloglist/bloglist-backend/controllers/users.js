const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
//const { response } = require("../app");

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    if (!password) {
        return response.status(400).json({ error: "password missing" });
    }
    if (password.length < 3) {
        return response
            .status(400)
            .json({ error: "password needs to be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordhash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordhash,
        blogs: [],
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        author: 1,
        url: 1,
        title: 1,
    });
    response.json(users);
});

module.exports = usersRouter;
