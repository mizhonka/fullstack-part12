const dummy = (blogs) => 1;

const sum = (blogs) => blogs.reduce((x, blog) => x + blog.likes, 0);

const favoriteBlog = (blogs) => {
    if (!blogs.length) {
        return {};
    }
    const likes = blogs.map((blog) => blog.likes);
    const maxLikes = likes.reduce((a, b) => Math.max(a, b), -Infinity);
    const favorites = blogs.filter((blog) => blog.likes === maxLikes);
    return {
        title: favorites[0].title,
        author: favorites[0].author,
        likes: favorites[0].likes,
    };
};

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author);
    const uniqueAuthors = Array.from(new Set(authors));

    let result = "";
    let maxPosts = 0;
    for (const i in uniqueAuthors) {
        const author = uniqueAuthors[i];
        const n = blogs.filter((blog) => blog.author === author).length;
        if (n > maxPosts) {
            result = author;
            maxPosts = n;
        }
    }

    return {
        author: result,
        blogs: maxPosts,
    };
};

const mostLikes = (blogs) => {
    const authors = blogs.map((blog) => blog.author);
    const uniqueAuthors = Array.from(new Set(authors));

    let result = "";
    let mostLikes = 0;
    for (const i in uniqueAuthors) {
        const author = uniqueAuthors[i];
        const likes = blogs
            .filter((blog) => blog.author === author)
            .reduce((x, blog) => x + blog.likes, 0);
        if (likes > mostLikes) {
            mostLikes = likes;
            result = author;
        }
    }

    return {
        author: result,
        likes: mostLikes,
    };
};

module.exports = {
    dummy,
    sum,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
