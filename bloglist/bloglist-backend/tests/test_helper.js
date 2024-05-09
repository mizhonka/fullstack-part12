const Blog=require('../models/blog')
const User=require('../models/user')

const initialBlogs=[
	{
		'title': 'Recipes',
		'author': 'Jamie Oliveoil',
		'url': 'link.com',
		'likes': 10,
		'id': '65d35e52135ed1fae417adfc'
	},
	{
		'title': 'Programs',
		'author': 'Ada Lovelace',
		'url': 'program.com',
		'likes': 12,
		'id': '65d360f9997c87746871f8bb'
	},
	{
		'title': 'My blog',
		'author': 'MH',
		'url': 'this.com',
		'likes': 666,
		'id': '65d361e93d9b6ac9c096ad4e'
	}
]

const blogsInDB=async () => {
	const blogs=await Blog.find({})
	return blogs.map(b => b.toJSON())
}

const usersInDB=async() => {
	const users=await User.find({})
	return users.map(u => u.toJSON())
}

module.exports={
	initialBlogs,
	blogsInDB,
	usersInDB
}
