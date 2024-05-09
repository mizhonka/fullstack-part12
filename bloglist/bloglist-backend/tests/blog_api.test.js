const { test, after, beforeEach, describe } =require('node:test')
const bcrypt=require('bcrypt')
const assert=require('node:assert')
const mongoose=require('mongoose')
const supertest=require('supertest')
const app = require('../app')
const Blog =require('../models/blog')
const User=require('../models/user')
const helper=require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)

	await User.deleteMany({})

	const passwordhash=await bcrypt.hash('sekret', 10)
	const newUser=new User({ username: 'root', passwordhash })

	await newUser.save()
})

describe('when initial blogs exist', () => {

	test('get correct amount of blogs', async() => {
		const response=await
        api
        .get('/api/blogs')
        .set({Authorization: `Bearer ${process.env['LOGIN_TOKEN']}`})

		assert.strictEqual(response.body.length, helper.initialBlogs.length)
	})

	test('blogs have id', async() => {
		const response=await api
        .get('/api/blogs')
        .set({Authorization: `Bearer ${process.env['LOGIN_TOKEN']}`})

		response.body.forEach(blog => {
			assert('id' in blog)
			assert(!('_id' in blog))
		})
	})

	describe('adding blogs', () => {
		test('valid blog can be added', async() => {

			const initializedUsers=await helper.usersInDB()
			const someUser=initializedUsers[0]
			const newBlog={
				title: 'Will this be added?',
				author: 'Mr. Unknown',
				url: 'www.somewhere.co',
				likes: 4,
				userId: someUser.id
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const response=await api.get('/api/blogs')
			const titles=response.body.map(r => r.title)

			assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
			assert(titles.includes('Will this be added?'))
		})

		test('likes is set to 0 if null', async() => {
			const initializedUsers=await helper.usersInDB()
			const someUser=initializedUsers[0]
			const newBlog={
				title: 'No Likes',
				author: 'Some One',
				url: 'qwerty.com',
				userId: someUser.id
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const response=await api.get('/api/blogs')
			const addedBlog=response.body.filter(r => r.title===newBlog.title)

			assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
			assert.strictEqual(addedBlog[0].likes, 0)
		})

		test('blog without title or url are not added', async() => {
			const initializedUsers=await helper.usersInDB()
			const someUser=initializedUsers[0]
			const newBlog={
				author: 'Lazy One',
				userId: someUser.id
			}
			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const response=await api.get('/api/blogs')

			assert.strictEqual(response.body.length, helper.initialBlogs.length)
		})
	})

	describe('deleting blogs', () => {
		test('blog can be deleted', async() => {
			const blogsAtStart=await helper.blogsInDB()
			const blogToBeDeleted=blogsAtStart[0]

			await api
				.delete(`/api/blogs/${blogToBeDeleted.id}`)
				.expect(204)

			const blogsAtEnd=await helper.blogsInDB()
			const existingIDs=blogsAtEnd.map(b => b.id)

			assert(!(blogToBeDeleted.id in existingIDs))
			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
		})
	})

	describe('updating blogs', () => {
		test('blog likes can be updated', async() => {
			const blogsAtStart=await helper.blogsInDB()
			const blogToBeUpdated=blogsAtStart[0]

			const newBlog={
				title: blogToBeUpdated.title,
				author: blogToBeUpdated.author,
				url: blogToBeUpdated.url,
				likes: 100
			}

			await api
				.put(`/api/blogs/${blogToBeUpdated.id}`)
				.send(newBlog)
				.expect(200)

			const blogsAtEnd=await helper.blogsInDB()
			const ids=blogsAtEnd.map(b => b.id)
			const likes=blogsAtEnd.map(b => b.likes)

			assert(likes.includes(newBlog.likes))
			assert(ids.includes(blogToBeUpdated.id))
			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
		})
	})
})

describe('when initial users exist', () => {

	describe('adding users', () => {
		test('creation succeeds with valid data', async() => {
			const usersAtStart=await helper.usersInDB()

			const newUser={
				username: 'mizhonka',
				name: 'MH',
				password: 'mystery'
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd=await helper.usersInDB()
			const usernames=usersAtEnd.map(u => u.username)

			assert(usernames.includes(newUser.username))
			assert.strictEqual(usersAtStart.length+1, usersAtEnd.length)
		})

		test('user without username is not added', async() => {
			const usersAtStart=await helper.usersInDB()

			const newUser={
				name: 'MH',
				password: 'mystery'
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd=await helper.usersInDB()
			const usernames=usersAtEnd.map(u => u.username)

			assert(!(usernames.includes(newUser.username)))
			assert.strictEqual(usersAtStart.length, usersAtEnd.length)
		})

		test('user without password is not added', async() => {
			const usersAtStart=await helper.usersInDB()

			const newUser={
				username: 'mizhonka',
				name: 'MH'
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd=await helper.usersInDB()
			const usernames=usersAtEnd.map(u => u.username)

			assert(!(usernames.includes(newUser.username)))
			assert.strictEqual(usersAtStart.length, usersAtEnd.length)
		})

		test('user with invalid username is not added', async() => {
			const usersAtStart=await helper.usersInDB()

			const newUser={
				username: 'no',
				name: 'MH',
				password: 'mystery'
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd=await helper.usersInDB()
			const usernames=usersAtEnd.map(u => u.username)

			assert(!(usernames.includes(newUser.username)))
			assert.strictEqual(usersAtStart.length, usersAtEnd.length)
		})

		test('user with already existing username is not added', async() => {
			const usersAtStart=await helper.usersInDB()

			const newUser={
				username: 'root',
				name: 'MH',
				password: 'mystery'
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd=await helper.usersInDB()
			const usernames=usersAtEnd.map(u => u.username).filter(u => u===newUser.username)

			assert.strictEqual(usernames.length, 1)
			assert.strictEqual(usersAtStart.length, usersAtEnd.length)
		})

		test('user with invalid password is not added', async() => {
			const usersAtStart=await helper.usersInDB()

			const newUser={
				username: 'mizhonka',
				name: 'MH',
				password: 'ab'
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd=await helper.usersInDB()
			const usernames=usersAtEnd.map(u => u.username)

			assert(!(usernames.includes(newUser.username)))
			assert.strictEqual(usersAtStart.length, usersAtEnd.length)
		})
	})
})

after(async () => {
	await mongoose.connection.close()
})


