/* page to register a new user*/

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = ()=>{
    const [email,setEmail] = useState(null);
    const [password , setPassword] = useState(null);
    const [re_password, setRe_password] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e)=>{
        e.preventDefault();
        setError(null);
        const response = await fetch('http://localhost:8000/register/user',{
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if(response.ok){
            /* then we will send the user to login page*/
            alert("User registered");
            navigate('/login');
        }
        else{
            /* an error*/
            const data = await response.json();
            setError(data.msg);
        }
    }

    return(
    <>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <label>Email</label>
            <input type='email' onChange={(e)=>setEmail(e.target.value)}></input>
            <br/>
            <label>Password</label>
            <input type='password' onChange={(e)=>setPassword(e.target.value)}></input>
            <br/>
            <label>Repeat Password</label>
            <input type='password' onChange={(e)=>setRe_password(e.target.value)}></input>
            <button type="submit">Register</button>
        </form>
        {error && <p>{error}</p>}
    </>)
}

export default Register;