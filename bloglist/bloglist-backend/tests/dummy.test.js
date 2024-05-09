const { test, describe } = require('node:test')
const assert = require('node:assert')
const list_helper = require('../utils/list_helper')
const sampleBlogs = require('../utils/sample_blogs')

test('dummy returns one', () => {
	const blogs = []
	const result = list_helper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('total likes', () => {
	test('of empty list is 0', () => {
		const result=list_helper.sum([])
		assert.strictEqual(result, 0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result=list_helper.sum([{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}])
		assert.strictEqual(result, 7)
	})

	test('of a bigger list is calculated right', () => {
		const result=list_helper.sum(sampleBlogs.blogs)
		assert.strictEqual(result, 36)
	})
})

describe('favorite blog', () => {
	test('of empty list is none', () => {
		const result=list_helper.favoriteBlog([])
		assert.deepEqual({}, result)
	})

	test('when list has only one blog equals that', () => {
		const result=list_helper.favoriteBlog([{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}])
		assert.deepEqual({
			title: 'React patterns',
			author: 'Michael Chan',
			likes: 7
		}, result)
	})

	test('of a bigger list is correct', () => {
		const result=list_helper.favoriteBlog(sampleBlogs.blogs)
		assert.deepEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12
		}, result)
	})
})

describe('most blogs', () => {
	test('of empty list is no-one', () => {
		const result=list_helper.mostBlogs([])
		assert.deepEqual({
			author: '',
			blogs: 0
		}, result)
	})

	test('when list has only one blog equals them', () => {
		const result=list_helper.mostBlogs([{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}])
		assert.deepEqual({
			author: 'Michael Chan',
			blogs: 1
		}, result)
	})

	test('of a bigger list is correct',() => {
		const result=list_helper.mostBlogs(sampleBlogs.blogs)
		assert.deepEqual({
			author: 'Robert C. Martin',
			blogs: 3
		}, result)
	})
})

describe('most likes', () => {
	test('of empty list is no-one', () => {
		const result=list_helper.mostLikes([])
		assert.deepEqual({
			author: '',
			likes: 0
		}, result)
	})

	test('when list has only one blog equals them', () => {
		const result=list_helper.mostLikes([{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}])
		assert.deepEqual({
			author: 'Michael Chan',
			likes: 7
		}, result)
	})

	test('of a bigger list is correct',() => {
		const result=list_helper.mostLikes(sampleBlogs.blogs)
		assert.deepEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		}, result)
	})
})
