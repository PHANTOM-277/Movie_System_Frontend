import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import './Home.css'
import formatDate from "../functions/formatdate";
import handleLogOut from "../functions/logout";

const BookingHistory = ()=>{
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(null);

    const handleLogOut1 = async()=>{
        await handleLogOut(setUser, navigate);
    }

    useEffect(()=>{
        const fetchdata = async()=>{
            /* first check if user is logged in by getting the data from local storage*/
            const email = localStorage.getItem('userEmail'); 
            const sessionId = localStorage.getItem('sessionId');
            const response = await fetch(`http://localhost:8000/movies/user/bookinghistory?email=${email}`,{
                method:"GET",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization":sessionId
                },
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setUser(email);
                if(data.bookinghistory.bookings.length > 0){
                    setBookings(data.bookinghistory.bookings);
                }
                else{
                    //do nothing , let it be null 
                }
            }
            else{
                localStorage.removeItem('userEmail');
                localStorage.removeItem('sessionId');
                alert("please login first");
                navigate('/');
            }
        }

        fetchdata();
    },[])
    
    return(
        <>
            <Navbar user={[user,handleLogOut1]} />
            <div className="movies-window">
                <div className="movies-container">
                    {bookings && bookings.map((item)=><Movie key={item.movie._id} booking={item} />)}
                    {!bookings && <p>No Bookings made</p>}
                </div>
            </div>
        </>
    )
}

const Movie = (props)=>{
    const {booked_at , isCancelled , movie , nseats} = props.booking;
    return(
        <div className="movie-card">
            <img src={movie.image_URL}  alt={movie.name} className="movie-image" />
            <p className="movie-name">{movie.name}</p>
            <p> Seats Booked : {nseats}</p>
            <p> Date : {formatDate(movie.date)}</p>
            <p> Booked At : {formatDate(booked_at)}</p>
        </div>
    )
}

export default BookingHistory