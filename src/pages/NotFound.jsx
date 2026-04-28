import React from 'react';
import { useNavigate } from 'react-router-dom'; // Jika kamu menggunakan React Router
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        backgroundColor: '#f8f9fa', 
        borderRadius: '20px',
        margin: '20px',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
    };

    const iconCircleStyle = {
        backgroundColor: '#e6f4f1', 
        color: '#00B074', 
        padding: '30px',
        borderRadius: '50%',
        marginBottom: '20px',
        fontSize: '50px'
    };

    const buttonStyle = {
        backgroundColor: '#00B074',
        color: 'white',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
        transition: '0.3s'
    };

    return (
        <div id="dashboard-container" style={{ padding: '20px' }}>
            <div style={containerStyle}>
                <div style={iconCircleStyle}>
                    <FaExclamationTriangle />
                </div>
                
                <h1 style={{ fontSize: '72px', margin: '0', color: '#333' }}>404</h1>
                <h2 style={{ fontSize: '24px', color: '#666', marginBottom: '10px' }}>
                    Waduh! Halaman Tidak Ditemukan
                </h2>
                <p style={{ color: '#999', maxWidth: '400px', lineHeight: '1.6' }}>
                    Maaf, sepertinya halaman yang kamu cari sudah dipindahkan atau tidak pernah ada di sistem Sedap.
                </p>

                <button 
                    style={buttonStyle} 
                    onClick={() => navigate('/dashboard')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#008a5b'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#00B074'}
                >
                    <FaArrowLeft /> Kembali ke Dashboard
                </button>
            </div>
        </div>
    );
}