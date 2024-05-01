// Frontend code (Home.js)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/Home2.css'; // Import your CSS file

function Home() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        fetchUploadedFiles();
    }, []); // Fetch uploaded files when component mounts

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const uploadFileToDatabase = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('File uploaded successfully!');
                setSelectedFile(null); // Reset selected file state after upload
                fetchUploadedFiles(); // Fetch the updated list of uploaded files
            } else {
                toast.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to upload file');
        }
    };

    const fetchUploadedFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/getUploadedFiles');
            if (response.ok) {
                const files = await response.json();
                setUploadedFiles(files);
            } else {
                console.error('Failed to fetch uploaded files');
            }
        } catch (error) {
            console.error('Error fetching uploaded files:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <img className="logo" alt="Kotelawala defence" src="kdu.png" />
                <h1 className="user4">GATE DASHBOARD</h1>
                <img src="profile-user.png" className="userimg" alt="User" />
                <h1>Leave Management System</h1>
            </div>
            <div className="nav-buttons">
                <Link to="" className="requestsbtn">
                    All Uploads
                </Link>
                <Link to="" className="vehiclesbtn">
                    Edit Uploads
                </Link>
            </div>
            <div className="panel1" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()}>
                {/* This div will handle the drag and drop */}
                <p>Drag and drop your file here or</p>
                <input type="file" onChange={handleFileSelect} />
                {selectedFile && (
                    <div>
                        <p>Selected file: {selectedFile.name}</p>
                        <button onClick={uploadFileToDatabase}>Upload</button>
                    </div>
                )}
            </div>
            <div>
                <h2>Uploaded Files:</h2>
                <ul>
                    {uploadedFiles.map((file, index) => (
                        <li key={index}>{file.filename}</li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
