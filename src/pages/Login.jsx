import { useNavigate } from "react-router-dom";
import {useState} from "react";

const Login = ()=>{
    const navigate = useNavigate();//for react router 
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    
    const handlesubmit = async(e)=>{
        e.preventDefault();
        setError(false);//clear previous errors
        try{
            const response = await fetch("http://localhost:8000/login/user",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
            if(response.ok){
                localStorage.setItem('userEmail', email);
                localStorage.setItem('sessionId', data.sessionId);
                navigate('/'); //go to home
            }
            else{
                setError(data.msg||"Failed to Login");
            }
        }
        catch(err){
            console.log(err);
            setError("Server Error");
        }
    }
    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <label>Email</label>
                <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                <label>Password</label>
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <button type='submit'>Submit</button>
            </form>
            {error && <p>{error}</p>}
        </>
    )

}

export default Login;