import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../index.css'

const UserList = () => {
    const allUsers = useSelector((state) => state['users'])

    return (
        <>
            <h1>Users</h1>
            <div className="row">
                <div className="column">
                    <b>name</b>
                    {allUsers.map((u) => (
                        <p key={u.id}>
                            <Link className={'react_link'} to={`/${u.id}`}>
                                {u.name}
                            </Link>
                        </p>
                    ))}
                </div>
                <div className="column">
                    <b>blogs created</b>
                    {allUsers.map((u) => (
                        <p key={u.id}>{u.blogs.length}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserList
