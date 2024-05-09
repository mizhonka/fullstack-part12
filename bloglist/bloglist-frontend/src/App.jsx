import './index.css'
import { useState, useEffect, useRef } from 'react'
import { StyledDiv, Button, Navigation } from './styles'
import { Routes, Route, Link } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Add from './components/Add'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import UserList from './components/UserList'

const App = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const updateBlogs = () => {
        dispatch(initializeBlogs())
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        dispatch(initializeUsers())
        updateBlogs()
    }, [])

    const handleUsername = (event) => setUsername(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const logOut = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            dispatch(
                setNotification(['logged in successfully', 'success'], 3000),
            )
            updateBlogs()
        } catch (exception) {
            dispatch(
                setNotification(['wrong username or password', 'error'], 3000),
            )
        }
    }

    const createBlogRef = useRef()

    const createBlog = async (blogObject) => {
        try {
            const blog = await blogService.create(blogObject)
            createBlogRef.current.toggleVisibility()
            updateBlogs()
            dispatch(
                setNotification(
                    [
                        `${blogObject.title} by ${blogObject.author} added`,
                        'success',
                    ],
                    3000,
                ),
            )
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(['failed to add blog', 'error'], 3000))
        }
    }

    const Menu = () => {
        return (
            <Navigation>
                <Link className={'react_link'} to={'/'}>
                    blogs
                </Link>
                <Link className={'react_link'} to={'/users'}>
                    users
                </Link>
                {user.name} logged in <Button onClick={logOut}>logout</Button>
            </Navigation>
        )
    }

    const BlogListView = () => (
        <div>
            <Notification />
            <h1>bloglist</h1>
            <Toggable buttonLabel="new blog" ref={createBlogRef}>
                <h2>create new</h2>
                <Add createBlog={createBlog} />
            </Toggable>
            <BlogList />
        </div>
    )

    const UserListView = () => (
        <div>
            <Notification />
            <h1>bloglist</h1>
            <UserList />
        </div>
    )

    const UserView = () => (
        <div>
            <Notification />
            <h1>bloglist</h1>
            <User />
        </div>
    )

    const BlogView = () => (
        <div>
            <Notification />
            <h1>bloglist</h1>
            <Blog />
        </div>
    )

    if (user === null) {
        return (
            <StyledDiv>
                <h1>bloglist</h1>
                <Toggable buttonLabel="login">
                    <Notification style={'error'} />
                    <h2>login to application:</h2>
                    <Login
                        handleLogin={handleLogin}
                        username={username}
                        handleUsername={handleUsername}
                        password={password}
                        handlePassword={handlePassword}
                    />
                </Toggable>
            </StyledDiv>
        )
    }

    return (
        <StyledDiv>
            <div>
                <Menu />
            </div>
            <Routes>
                <Route path="/" element={<BlogListView />} />
                <Route path="/users" element={<UserListView />} />
                <Route path="/:id" element={<UserView />} />
                <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>
        </StyledDiv>
    )
}

export default App
