import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Home.css'; // Import your CSS file

function Home() {
    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons">
                <Link to="/FormD" className="requestsbtn">
                    Requests
                </Link>
                <Link to="/VehicleDetails" className="vehiclesbtn">
                    Conformations
                </Link>
                <Link to="/Assign" className="assignbtn">
                    Rejections
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

export default Home;
