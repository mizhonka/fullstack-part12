import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { List, ListItem } from '../styles'

const User = () => {
    const id = useParams().id
    const users = useSelector((state) => state['users'])
    const user = users.find((u) => u.id === id)

    if (!user) {
        return null
    }

    return (
        <>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <List>
                {user.blogs.map((b) => (
                    <ListItem key={b.id}>{b.title}</ListItem>
                ))}
            </List>
        </>
    )
}

export default User
