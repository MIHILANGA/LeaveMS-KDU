import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/Home2.css'; // Import your CSS file

function Home() {
    const [formData, setFormData] = useState({
        name: '',
        intake: '',
        department: '',
        date_in: '',
        time_in: '',
        date_out: '',
        time_out: '',
        reason: '',
        confirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                toast.success('Request submitted successfully!');
                setFormData({
                    name: '',
                    intake: '',
                    department: '',
                    date_in: '',
                    time_in: '',
                    date_out: '',
                    time_out: '',
                    reason: '',
                    confirmation: ''
                });
            } else {
                toast.error('Failed to submit request');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to submit request');
        }
    };

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user3">STUDENT DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons">
                <Link to="/RConformation" className="requestsbtn">
                    All Requests & Confirmations
                </Link>
                <Link to="/REdit" className="vehiclesbtn">
                    Edit
                </Link>
            </div>
            <div className="panel1">
                <h2>Leave Form (DaySchoolers, Cadets)</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-column">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                            <label htmlFor="intake">Intake:</label>
                            <input type="text" id="intake" name="intake" value={formData.intake} onChange={handleChange} />
                        </div>
                        <div className="form-column">
                            <label htmlFor="department">Department:</label>
                            <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-column">
                            <label htmlFor="dateOut">Date Out:</label>
                            <input type="date" id="dateOut" name="date_out" value={formData.date_out} onChange={handleChange} />

                            <label htmlFor="dateIn">Date In:</label>
                            <input type="date" id="dateIn" name="date_in" value={formData.date_in} onChange={handleChange} />
                        </div>
                        <div className="form-column">
                            <label htmlFor="timeOut">Time Out:</label>
                            <input type="time" id="timeOut" name="time_out" value={formData.time_out} onChange={handleChange} />

                            <label htmlFor="timeIn">Time In:</label>
                            <input type="time" id="timeIn" name="time_in" value={formData.time_in} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <label htmlFor="reason">Reason:</label>
                        <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
