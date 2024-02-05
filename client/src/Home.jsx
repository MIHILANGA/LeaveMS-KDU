import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Home.css'; // Import your CSS file

function Signup() {
    return (
        <div className="signup-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons">
                <Link to="/FormD" className="requestsbtn">
                    Requests
                </Link>
                <Link to="/VehicleDetails" className="vehiclesbtn">
                    Vehicles
                </Link>
                <Link to="/Assign" className="assignbtn">
                    Assign
                </Link>
                <Link to="/DriversDetails" className="driverbtn">
                    Drivers
                </Link>
                <Link to="/SpecialRequest" className="reservationbtn">
                    Reservations
                </Link>
            </div>
            {/* Panel section */}
            <div className="panel">
                {/* Your panel content goes here */}
                <h2>Student Requests (DaySchoolers , Cadets)</h2>
                
            </div>
            <div className="panel2">
                {/* Your panel content goes here */}
                <h2>Other Requests (Officers , Staff)</h2>
                
            </div>
        </div>
    );
}

export default Signup;
