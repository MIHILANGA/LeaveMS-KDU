import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './CSS/Home.css';

function Home() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = () => {
        fetch('http://localhost:3001/request')
            .then(response => response.json())
            .then(data => {
                const filteredRequests = data.filter(request => request.confirmation === "");
                // Sort requests by date_out field
                filteredRequests.sort((a, b) => new Date(a.date_out) - new Date(b.date_out));
                setRequests(filteredRequests);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSendQR = requestId => {
        // Update confirmation status in the database
        fetch(`http://localhost:3001/updateConfirmation/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ confirmation: 'Confirmed' }),
        })
            .then(response => {
                if (response.ok) {
                    // If the update is successful, fetch the updated requests
                    fetchRequests();
                    console.log('Confirmation updated successfully');
                } else {
                    console.error('Failed to update confirmation status');
                }
            })
            .catch(error => {
                console.error('Error updating confirmation status:', error);
            });
    };

    const handleReject = requestId => {
        // Update rejection status in the database
        fetch(`http://localhost:3001/updateRejection/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ confirmation: 'Rejected' }),
        })
            .then(response => {
                if (response.ok) {
                    // If the update is successful, fetch the updated requests
                    fetchRequests();
                    console.log('Rejection updated successfully');
                } else {
                    console.error('Failed to update rejection status');
                }
            })
            .catch(error => {
                console.error('Error updating rejection status:', error);
            });
    };

    // Function to convert UTC date string to local date string
    const convertToLocalDate = utcDateString => {
        const date = new Date(utcDateString);
        return date.toLocaleDateString(); // Get local date string
    };

    return (
        <div className="home-container">
            {/* Header and navigation buttons */}
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user2">ADMIN DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons1">
                <Link to="/Allrequests" className="requestsbtn">
                    All Requests
                </Link>
                <Link to="/InandOut" className="vehiclesbtn">
                    Students In & Out Details
                </Link>
                <Link to="/Gateletters" className="assignbtn">
                    Gate Letters
                </Link>
                <Link to="/DriversDetails" className="driverbtn">
                    Cadets & Officers Details
                </Link>
                <Link to="/S0pecialRequest" className="reservationbtn">
                    Documents
                </Link>
            </div>
            <div className="panel">
                <h2>New Requests</h2>
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
                                
                                <td>
                                    <button onClick={() => handleSendQR(request._id)}>
                                        Send QR
                                    </button>
                                    <button onClick={() => handleReject(request._id)}>
                                        Reject
                                    </button>
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
