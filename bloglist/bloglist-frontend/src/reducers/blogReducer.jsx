import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload.sort((a, b) => a.likes - b.likes)
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        const initial = await blogs.getAll()
        dispatch(setBlogs(initial))
    }
}

export const like = (id) => {
    return async (dispatch) => {
        const initial = await blogs.getAll()
        const likedBlog = initial.filter((blog) => blog.id === id)[0]
        const newBlog = {
            user: likedBlog.user,
            title: likedBlog.title,
            author: likedBlog.author,
            url: likedBlog.url,
            likes: likedBlog.likes + 1,
            isVisible: false,
        }
        await blogs.update(newBlog, id)
        const all = await blogs.getAll()
        dispatch(setBlogs(all))
    }
}

export const remove = (id) => {
    return async (dispatch) => {
        await blogs.deleteBlog(id)
        const all = await blogs.getAll()
        dispatch(setBlogs(all))
    }
}

export const comment = (id, comment) => {
    return async (dispatch) => {
        await blogs.commentBlog(id, comment)
        const all = await blogs.getAll()
        dispatch(setBlogs(all))
    }
}

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer
