import React, { useState, useEffect, useRef } from 'react';
import './CSS/Home3.css';
import jsQR from 'jsqr';

function Home() {
    const [showCamera, setShowCamera] = useState(false);
    const [qrCodeResult, setQRCodeResult] = useState('');
    const videoRef = useRef();

    useEffect(() => {
        if (showCamera) {
            const startScan = () => {
                const video = videoRef.current;
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                const scan = () => {
                    if (video.readyState === video.HAVE_ENOUGH_DATA) {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);

                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, imageData.width, imageData.height);

                        if (code) {
                            setQRCodeResult(code.data);
                        }
                    }
                    requestAnimationFrame(scan);
                };

                scan();
            };

            startScan();
        }
    }, [showCamera]);

    const handleOpenCamera = () => {
        setShowCamera(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    };

    return (
        <div className="home-container">
            <div className="header-rectangle">
                <h1>Leave Management System</h1>
            </div>

            <button onClick={handleOpenCamera}>Open Camera</button>

            {showCamera && (
                <div className="camera-container">
                    <video ref={videoRef} autoPlay playsInline />
                    {qrCodeResult && (
                        <p>Scanned QR Code Data: {qrCodeResult}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
