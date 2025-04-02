const handleLogOut= async(setUser, navigate)=>{
    /* first remove localStorage*/
    const email = localStorage.getItem('userEmail');
    const sessionId = localStorage.getItem('sessionId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('sessionId');
    const response = await fetch(`http://localhost:8000/logout/user`,{
        method:"POST",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization":sessionId
        },
        body: JSON.stringify({ email})
    });
    //it doesn't matter if we get any error
    navigate('/');
    setUser(null);
}

export default handleLogOut;