import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { like, remove, comment } from '../reducers/blogReducer'
import { handleComment } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Button, List, ListItem, StyledLink } from '../styles'

const Blog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams().id
    const blogs = useSelector((state) => state['blogs'])
    const curComment = useSelector((state) => state['comment'])
    const blog = blogs.find((b) => b.id === id)

    const handleLike = () => {
        dispatch(like(id))
    }

    const handleDelete = () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            try {
                dispatch(remove(id))
                dispatch(
                    setNotification(['deleted successfully', 'success'], 3000),
                )
                navigate('/')
            } catch {
                dispatch(setNotification(['failed to delete', 'error'], 3000))
            }
        }
    }

    const typeComment = (event) => {
        dispatch(handleComment(event.target.value))
    }

    const postComment = (event) => {
        event.preventDefault()
        dispatch(comment(id, curComment))
        dispatch(handleComment(''))
    }

    if (!blog) {
        return null
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <StyledLink href={blog.url}>@{blog.url}</StyledLink>
            <p>
                {blog.likes} likes <Button onClick={handleLike}>like</Button>
            </p>
            <p>added by {blog.author}</p>
            <Button onClick={handleDelete}>delete</Button>
            <h2>comments</h2>
            <form onSubmit={postComment}>
                <input type="text" value={curComment} onChange={typeComment} />
                <Button type="submit">add comment</Button>
            </form>
            <List>
                {blog.comments.map((c) => (
                    <ListItem key={c}>{c}</ListItem>
                ))}
            </List>
        </div>
    )
}

export default Blog
