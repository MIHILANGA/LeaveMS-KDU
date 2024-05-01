import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import * as XLSX from 'xlsx';
import './CSS/InandOut.css';

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
                // Sort requests by date_out field in descending order
                data.sort((a, b) => new Date(b.date_out) - new Date(a.date_out));
                setRequests(data);
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

    // Filter requests based on search query
    const filteredRequests = requests.filter(request =>
        request.name && request.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle exporting data to Excel
    const handleExport = () => {
        const dataToExport = filteredRequests.map(request => ({
            'User Name': request.name,
            'Intake': request.intake,
            'Department': request.department,
            'Requested Date Out': convertToLocalDate(request.date_out),
            'Date Out': convertToLocalDate(request.Rdate_out),
            'Requested Time Out': request.time_out,
            'Time Out': request.Rtime_out,
            'Requested Date In': convertToLocalDate(request.date_in),
            'Date In': convertToLocalDate(request.Rdate_in),
            'Requested Time In': request.time_in,
            'Time In': request.Rtime_in,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'InAndOutDetails');
        XLSX.writeFile(workbook, 'InAndOutDetails.xlsx');
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
            
            <div className="panel2">
                <h2>All In and Out Details</h2>
               
                <input
                    className="search-container1"
                    type="text"
                    placeholder="Search by user name"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {/* Download button */}
                <button className="download-button" onClick={handleExport}>Export Excel Sheet</button>

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
                            <th>Requested Date In</th>
                            <th>Date In</th>
                            <th>Requested Time In</th>
                            <th>Time In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.intake}</td>
                                <td>{request.department}</td>
                                <td>{convertToLocalDate(request.date_out)}</td>
                                <td>{convertToLocalDate(request.Rdate_out)}</td>
                                <td>{request.time_out}</td>
                                <td>{request.Rtime_out}</td>
                                <td>{convertToLocalDate(request.date_in)}</td>
                                <td>{convertToLocalDate(request.Rdate_in)}</td>
                                <td>{request.time_in}</td>
                                <td>{request.Rtime_in}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
