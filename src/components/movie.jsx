import { Link } from "react-router-dom";

/* This component is an individual movie displayed on the home page*/
const Movie = (props)=>{
    const {base_price , capacity , current_price , date , image_URL , name , seatsbooked, status, _v , _id} = props.movie;
    return(
        <div>
            <p>{name}</p>
            <img src={image_URL} />
            <p> Seats Left : {capacity - seatsbooked}</p>
            <p> Date : {date}</p>
            <p> Price : {current_price}</p>
            <Link to={`/MovieDetails/:${_id}`} > Book Seats </Link>
        </div>
    )
}

export default Movie;