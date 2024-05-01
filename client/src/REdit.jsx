import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './CSS/RConformation.css'; // Import your CSS file

function RConformation() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch requests data when the component mounts
        axios.get('http://localhost:3001/requestss')
            .then(response => {
                // If request is successful, set the data in state
                setRequests(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user3">STUDENT DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            <div className="panel4">
                <h2>Edit Requests Details</h2>
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Out</th>
                            <th>Time Out</th>
                            <th>Date In</th>
                            <th>Time In</th>
                            <th>Reason</th>
                            <th>Conformation or Reject</th>
                            <th>QR Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.date_out}</td>
                                <td>{request.time_out}</td>
                                <td>{request.date_in}</td>
                                <td>{request.time_in}</td>
                                <td>{request.reason}</td>
                                <td>{request.conformation}</td>
                                <td>{request.qr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RConformation;
