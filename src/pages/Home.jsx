import { useState,useEffect } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import Movie from '../components/movie';
import Navbar from '../components/navbar';
import './Home.css'
import handleLogOut from '../functions/logout';

const Home = ()=>{
    const [user,setUser] = useState(null);//initially not logged in
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    const handleLogOut1 = async()=>{
        await handleLogOut(setUser, navigate);
    }
    useEffect(()=>{
        const fetchData = async () => {

            try{

                /* first we get user data , then we fetch data from server about recent movies */
                const email = localStorage.getItem('userEmail'); 
                const sessionId = localStorage.getItem('sessionId');

                if(email && sessionId){ 
                    setUser(email); // Set user if logged in
                }

                // Fetch all movies
                const response = await fetch('http://localhost:8000/movies/info');
                const data = await response.json();
                console.log(data);
                setMovies(data.movies); // by making movies as a State , after this component will re-render
            }
            catch(err){
                console.error("Error fetching movies:", err);
            }
        };

        fetchData();
    },[])
    return(
        <>  
            <Navbar user={[user, handleLogOut1]} />{/* this basically helps the navbar know if user's logged in or not*/}
            <div className="movies-window">
                <div className="movies-container">
                    {movies && movies.map((item)=><Movie key={item._id} movie={item} />)}
                </div>
            </div>
        </>
    )
}

export default Home;