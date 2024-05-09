import '../index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notif = useSelector((state) => state['notification'])
    return <div className={notif[0] ? notif[1] : ''}>{notif[0]}</div>
}

export default Notification
