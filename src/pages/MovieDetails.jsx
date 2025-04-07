import { useState,useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Navbar from '../components/navbar';
import './MovieDetails.css'
import handleLogOut from '../functions/logout';
import formatDate from '../functions/formatdate'

const MovieDetails = ()=>{
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [seats, setSeats] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogOut1 = async()=>{
        await handleLogOut(setUser, navigate);
    }

    const handleBooking = ()=>{
        setError(null);
        if(seats > data.capacity - data.seatsbooked){
            setError("Cannot book more than available seats");
            return;
        }
        if(seats < 1){
            setError("invalid number of seats");
            return
        }
        //now we have to check if user is logged in or not
        const makebooking = async()=>{
            const email = localStorage.getItem('userEmail'); 
            const sessionId = localStorage.getItem('sessionId');
            const requestUrl = `http://localhost:8000/movies/booking/${id}/${seats}`;
            console.log("Fetch Request URL:", requestUrl);
            const response = await fetch(requestUrl,{
                method:"POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization":sessionId
                },
                body: JSON.stringify({email}),
            });
            if(response.ok){
                alert("Seats booked!");
                navigate('/');
            }
            else{
                const resdata = await response.json();
                console.log(resdata);
                setUser(null);
                setError("Please Login first");
            }
        }

        makebooking();

    }

    useEffect(()=>{
        const getData = async()=>{
            const response = await fetch(`http://localhost:8000/movies/info/${id}`);
            const jsondata = await response.json();

            const email = localStorage.getItem('userEmail'); 
            const sessionId = localStorage.getItem('sessionId');

            if(email && sessionId){ 
                    setUser(email); // Set user if logged in
            }

            console.log(jsondata.movie);
            setData(jsondata.movie);
        }
        getData();
    },[]);
    
    return(
        <>
            <Navbar user={[user,handleLogOut1]} />
            {data ? (
                    <>
                        <div className="main-container">
                            <div className="movie-details-info">
                                <img src={data.image_URL} alt={data.name} className="movie-details-image" />
                                <h1 className="movie-title">{data.name}</h1>
                                <p><strong>Date:</strong> {formatDate(data.date)}</p>
                                <p><strong>Seats Left:</strong> {data.capacity - data.seatsbooked}</p>
                                <p><strong>Current Price:</strong> ₹{data.current_price}</p>
                                <input type='number' value={seats} onChange={(e)=>setSeats(e.target.value)}></input>
                                {user ? (
                                    <button className="book-now-btn" onClick={handleBooking}>Book Now</button>
                                ) : (
                                    <p className="login-message">Login to book tickets.</p>
                                )}
                                {error && <p className="error-message">{error}</p>}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="error">Movie not found.</p>
                )}
        </>
    )
}

export default MovieDetails;