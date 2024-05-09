const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body;

    const user = request.user;

    const blog = new Blog(body);
    if (!blog.likes) {
        blog.likes = 0;
    }
    blog.user = user._id;

    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user._id.toString())
        await Blog.findByIdAndDelete(request.params.id);
    else
        return response
            .status(401)
            .json({ error: "invalid user for deletion" });

    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body;
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        isVisible: false,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });
    response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
    const comment=request.body['comment']
    const blog = await Blog.findById(request.params.id)
    blog.comments=blog.comments.concat(comment)
    await blog.save()
    response.json(blog)
})
module.exports = blogsRouter;
