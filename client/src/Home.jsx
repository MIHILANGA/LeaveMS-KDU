import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode component
import './CSS/Home.css'; // Import your CSS file

function Home() {
    const [studentRequests, setStudentRequests] = useState([]);
    const [otherRequests, setOtherRequests] = useState([]);
    const [troopCommanderApproved, setTroopCommanderApproved] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/notification')
            .then(response => response.json())
            .then(data => {
                const studentReqs = data.filter(item => item.category === 'student');
                const otherReqs = data.filter(item => item.category !== 'student');
                setStudentRequests(studentReqs);
                setOtherRequests(otherReqs);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleTroopCommanderApproval = () => {
        setTroopCommanderApproved(true);
    };

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons1">
                <Link to="/FormD" className="requestsbtn">
                    All Requests
                </Link>
                <Link to="/VehicleDetails" className="vehiclesbtn">
                    Troop.C Conformations
                </Link>
                <Link to="/Assign" className="assignbtn">
                    Student Details
                </Link>
                <Link to="/DriversDetails" className="driverbtn">
                    Cadets & Officers Details
                </Link>
                <Link to="/SpecialRequest" className="reservationbtn">
                    Documents
                </Link>
            </div>
            {/* Panel section */}
            <div className="panel">
                <h2>Student Requests (DaySchoolers, Cadets)</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Description</th>
                            <th>QR Code</th> {/* Add QR Code column */}
                        </tr>
                    </thead>
                    <tbody>
                        {studentRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.requestId}</td>
                                <td>{request.description}</td>
                                <td>
                                    <QRCode
                                        value={request.requestId}
                                        onClick={handleTroopCommanderApproval}
                                    />
                                </td> {/* Generate QR code */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="panel2">
                <h2>Other Requests (Officers, Staff)</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Password</th>
                            <th>QR Code</th> {/* Add QR Code column */}
                        </tr>
                    </thead>
                    <tbody>
                        {otherRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.email}</td>
                                <td>{request.password}</td>
                                <td>
                                    <QRCode
                                        value={`${request.email}:${request.password},${"TroopCommanderApproval"}`}
                                       
                                    />
                                </td> {/* Generate QR code */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {troopCommanderApproved && <div>Troop Commander Approved!</div>}
        </div>
    );
}

export default Home;
