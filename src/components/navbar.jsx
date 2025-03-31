import {Link} from "react-router-dom"
import '../pages/Home.css'

const Navbar = (props)=>{
    const user = props.user;
    return(
        <div className="navbar">
            <Link to='/'>Home</Link>
            {user && <Link to='/login'>Login</Link>}
            {user || <p>{user}</p>}
        </div>
    )
}

export default Navbar;