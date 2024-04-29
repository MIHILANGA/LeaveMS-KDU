import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './CSS/Login.css'; // Import your CSS file

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    if (email === "admin") {
                        navigate('/home', { state: { email, username: 'admin' } }); // Redirect to /home for admin
                    } else if (email === "gate") {
                        navigate('/home3', { state: { email, username: 'user' } }); // Redirect to /home2 for user1
                    } else {
                        navigate('/home2', { state: { email, username: 'user' } }); // Redirect to /home3 for other users
                    }
                } else {
                    console.log("Login failed"); // Add this line to log failed login attempts
                }
            })
            .catch(err => console.log(err.response.data)); // Log error response from the server
    }

    return (
        <div className="login-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1>Leave Management System</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="frame1">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-5"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                className="form-control rounded-5"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-5 bg-dark">
                            Submit
                        </button>
                        <p>You do not have an Account</p>
                        <Link to="/" className="btn btn-default border w-100 bg-light rounded-5 text-decoration-none ">
                            Register
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
