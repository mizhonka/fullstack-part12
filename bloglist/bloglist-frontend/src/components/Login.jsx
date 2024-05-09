import PropTypes from 'prop-types'
import { Button } from '../styles'

const Login = ({
    handleLogin,
    username,
    handleUsername,
    password,
    handlePassword,
}) => (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                username:{' '}
                <input
                    type="text"
                    data-testid="username-input"
                    value={username}
                    onChange={handleUsername}
                />
            </div>
            <div>
                password:{' '}
                <input
                    type="password"
                    data-testid="password-input"
                    value={password}
                    onChange={handlePassword}
                />
            </div>
            <div>
                <Button type="submit">login</Button>
            </div>
        </form>
    </div>
)

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePassword: PropTypes.func.isRequired,
}

export default Login
