// Login.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css"; // CSS file

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const response = await fetch("http://localhost:8000/login/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                localStorage.setItem("userEmail", email);
                localStorage.setItem("sessionId", data.sessionId);
                navigate("/");
            } else {
                setError(data.msg || "Failed to Login");
            }
        } catch (err) {
            console.log(err);
            setError("Server Error");
        }
    };

    return (
        <div className="window">
            <div className="login-container">
                <form className="login-form" onSubmit={handlesubmit}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
