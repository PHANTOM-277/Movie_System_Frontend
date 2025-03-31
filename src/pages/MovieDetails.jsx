import { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom'
import Navbar from '../components/navbar';
import './MovieDetails.css'

const MovieDetails = ()=>{
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
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
            <Navbar user={user} />
            {data ? (
                    <>
                        <div className="main-container">
                            <div className="movie-details-info">
                                <img src={data.image_URL} alt={data.name} className="movie-details-image" />
                                <h1 className="movie-title">{data.name}</h1>
                                <p><strong>Date:</strong> {data.date}</p>
                                <p><strong>Seats Left:</strong> {data.capacity - data.seatsbooked}</p>
                                <p><strong>Current Price:</strong> ₹{data.current_price}</p>

                                {user ? (
                                    <button className="book-now-btn">Book Now</button>
                                ) : (
                                    <p className="login-message">Login to book tickets.</p>
                                )}
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