import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './CSS/Allrequest.css';

function Home() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = () => {
        fetch('http://localhost:3001/request')
            .then(response => response.json())
            .then(data => {
                // Sort requests by date_out field in descending order
                data.sort((a, b) => new Date(b.date_out) - new Date(a.date_out));
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    

    const handleDelete = requestId => {
        fetch(`http://localhost:3001/deleteRequest/${requestId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetchRequests();
                    console.log('Request deleted successfully');
                } else {
                    console.error('Failed to delete request');
                }
            })
            .catch(error => {
                console.error('Error deleting request:', error);
            });
    };

    const convertToLocalDate = utcDateString => {
        const date = new Date(utcDateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user2">ADMIN DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            
            <div className="panel2">
                <h2>All Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>User Name</th>
                            <th>Intake</th>
                            <th>Department</th>
                            <th>Date Out</th>
                            <th>Time Out</th>
                            <th>Date In</th>
                            <th>Time In</th>
                            <th>Reason</th>
                            <th>Confirmation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>{request._id}</td>
                                <td>{request.name}</td>
                                <td>{request.intake}</td>
                                <td>{request.department}</td>
                                <td>{convertToLocalDate(request.date_out)}</td>
                                <td>{request.time_out}</td>
                                <td>{convertToLocalDate(request.date_in)}</td>
                                <td>{request.time_in}</td>
                                <td>{request.reason}</td>
                                <td>{request.confirmation}</td>
                                <td>
                                    <button onClick={() => handleDelete(request._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
