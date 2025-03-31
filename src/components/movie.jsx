import { Link } from "react-router-dom";
import '../pages/Home.css'
/* This component is an individual movie displayed on the home page*/
const Movie = (props)=>{
    const {base_price , capacity , current_price , date , image_URL , name , seatsbooked, status, _v , _id} = props.movie;
    return(
        <div className="movie-card">
            <img src={image_URL}  alt={name} className="movie-image" />
            <p className="movie-name">{name}</p>
            <p> Seats Left : {capacity - seatsbooked}</p>
            <p> Date : {date}</p>
            <p> Price : {current_price}</p>
            <Link to={`/MovieDetails/${_id.toString()}`} className="book-btn"> Book Seats </Link>
        </div>
    )
}

export default Movie;