import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css"; // Link to CSS file

const Register = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [re_password, setRe_password] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== re_password) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:8000/register/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert("User registered");
            navigate("/login");
        } else {
            const data = await response.json();
            setError(data.msg);
        }
    };

    return (
        <div className="window">
            <div className="register-container">
                <form className="register-form" onSubmit={handleRegister}>
                    <h2>Create Account</h2>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required />

                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required />

                    <label>Repeat Password</label>
                    <input type="password" onChange={(e) => setRe_password(e.target.value)} required />

                    <button type="submit">Register</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
