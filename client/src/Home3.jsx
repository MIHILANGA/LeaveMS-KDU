import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Gate.css';

function Home() {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = () => {
        fetch('http://localhost:3001/request')
            .then(response => response.json())
            .then(data => {
                // Sort requests by 'Requested Date Out' in descending order
                data.sort((a, b) => new Date(b.date_out) - new Date(a.date_out));
                setRequests(data); // Set all requests without filtering
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to convert UTC date string to local date string
    const convertToLocalDate = utcDateString => {
        const date = new Date(utcDateString);
        return date.toLocaleDateString(); // Get local date string
    };

    const handleUpload = (requestId, updatedRequest) => {
        // Update the request in the database
        fetch(`http://localhost:3001/updateRequest/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRequest),
        })
        .then(response => {
            if (response.ok) {
                console.log('Request updated successfully');
                fetchRequests(); // Refresh the requests list
            } else {
                console.error('Failed to update request');
            }
        })
        .catch(error => {
            console.error('Error updating request:', error);
        });
    };

    // Function to filter requests based on search query
    const filteredRequests = requests.filter(request =>
        request.name && request.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container">
            {/* Header and navigation buttons */}
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user4">GATE DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons3">
                <Link to="/Gletters" className="requestsbtn">
                    Letters Upload
                </Link>
                <Link to="/InandOut" className="vehiclesbtn">
                    Other
                </Link>
            </div>
            <div className="panel6">
                <h2>(Gate) All Requests</h2>
                <div className="search-container">
                    <input
                        className="search-container1"
                        type="text"
                        placeholder="Search by user name"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Intake</th>
                            <th>Department</th>
                            <th>Requested Date Out</th>
                            <th>Date Out</th>
                            <th>Requested Time Out</th>
                            <th>Time Out</th>
                            <th>Action (OUT)</th>
                            <th>Requested Date In</th>
                            <th>Date In</th>
                            <th>Requested Time In</th>
                            <th>Time In</th>
                            <th>Action (IN)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.intake}</td>
                                <td>{request.department}</td>
                                <td>{convertToLocalDate(request.date_out)}</td>
                                <td>
                                    {request.Rdate_out ? convertToLocalDate(request.Rdate_out) : <input type="date" value={request.Rdate_out || ''} onChange={(e) => request.Rdate_out = e.target.value} />}
                                </td>
                                <td>{request.time_out}</td>
                                <td>
                                    {request.Rtime_out ? request.Rtime_out : <input type="time" value={request.Rtime_out || ''} onChange={(e) => request.Rtime_out = e.target.value} />}
                                </td>
                                <td>
                                    <button onClick={() => handleUpload(request._id, request)}>
                                        Save
                                    </button>
                                </td>
                                <td>{convertToLocalDate(request.date_in)}</td>
                                <td>
                                    {request.Rdate_in ? convertToLocalDate(request.Rdate_in) : <input type="date" value={request.Rdate_in || ''} onChange={(e) => request.Rdate_in = e.target.value} />}
                                </td>
                                <td>{convertToLocalDate(request.date_in)}</td>
                                <td>
                                    {request.Rtime_in ? request.Rtime_in : <input type="time" value={request.Rtime_in || ''} onChange={(e) => request.Rtime_in = e.target.value} />}
                                </td>
                                <td>
                                    <button onClick={() => handleUpload(request._id, request)}>
                                        Save
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
