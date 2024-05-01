import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/Gateletters.css'; // Import your CSS file

function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/images');
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error.message);
                toast.error('Failed to fetch images');
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user2">ADMIN DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            
            <div className="panel10">
                <h2>All Letters</h2>
                {images.map((image, index) => (
                    <img key={index} src={image.filepath} alt={`Image ${index}`} />
                ))}
            </div>
           
            <ToastContainer />
        </div>
    );
}

export default Home;
