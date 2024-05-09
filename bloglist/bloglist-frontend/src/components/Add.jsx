import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../styles'

const Add = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (event) => setTitle(event.target.value)
    const handleAuthor = (event) => setAuthor(event.target.value)
    const handleUrl = (event) => setUrl(event.target.value)

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title: title,
            author: author,
            url: url,
            isVisible: false,
        }
        createBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title:{' '}
                    <input
                        type="text"
                        data-testid="title-input"
                        id="title-input"
                        value={title}
                        onChange={handleTitle}
                    />
                </div>
                <div>
                    author:{' '}
                    <input
                        type="text"
                        data-testid="author-input"
                        id="author-input"
                        value={author}
                        onChange={handleAuthor}
                    />
                </div>
                <div>
                    url:{' '}
                    <input
                        type="text"
                        data-testid="url-input"
                        id="url-input"
                        value={url}
                        onChange={handleUrl}
                    />
                </div>
                <div>
                    <Button type="submit">create</Button>
                </div>
            </form>
        </div>
    )
}

Add.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default Add
