import {Link, useNavigate} from "react-router-dom"
import '../pages/Home.css'
import { useState } from "react";

const Navbar = (props)=>{
    const user  = props.user[0];
    const handleLogOut1 = props.user[1];


    return(
        <div className="navbar">
            <Link to='/' className="home">Home</Link>
            {!user && <Link to='/login' className="login">Login</Link>}
            {user && <Link to='/BookingHistory' className="BookingHistory">Booking History</Link>}
            {user && <p>{user}</p>}
            {user && <p onClick={handleLogOut1} className="Log-out">Log Out</p>}
        </div>
    )
}

export default Navbar;