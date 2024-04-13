import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './CSS/RConformation.css';

function RConformation() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/request')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1>Leave Management System</h1>
            </div>
            <div className="panel4">
                <h2>All Requests Details</h2>
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
                            <th>sdfadf</th>
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
                                <td>{request.confirmation}</td>
                                <td></td>
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
