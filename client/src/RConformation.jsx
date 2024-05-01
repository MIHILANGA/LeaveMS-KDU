import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './CSS/RConformation.css';

function RConformation() {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/request')
            .then(response => {
                // Convert date strings to local dates
                const updatedRequests = response.data.map(request => ({
                    ...request,
                    date_out: new Date(request.date_out).toLocaleDateString(),
                    
                }));
                // No need to reverse the array
                setRequests(updatedRequests);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Filter requests based on search query
    const filteredRequests = requests.filter(request =>
        request.name && request.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user3">STUDENT DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            <div className="panel4">
                <h2>All Requests Details</h2>
                {/* Search bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <i className="fa fa-search search-icon"></i>
                </div>
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Out</th>
                            <th>Time Out</th>
                            <th>Date In</th>
                            <th>Time In</th>
                            <th>Reason</th>
                            <th>Confirmation or Reject</th>
                            <th>QR Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.date_out}</td>
                                <td>{request.time_out}</td>
                                <td>{request.date_in}</td>
                                <td>{request.time_in}</td>
                                <td>{request.reason}</td>
                                <td>{request.confirmation}</td>
                                <td>
                                    {/* Generate QR code with specific data */}
                                    {request.confirmation === 'Confirmed' && (
                                        <QRCode value={JSON.stringify({
                                            name: request.name,
                                            intake: request.intake,
                                            department: request.department,
                                            message: 'Your request has been confirmed.'
                                        })} />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RConformation;
