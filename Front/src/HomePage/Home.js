import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
    body: {
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        textAlign: 'center',
        background: "url('background.jpg') no-repeat center center fixed",
        backgroundSize: 'cover'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    slogan: {
        fontSize: '3em',
        fontWeight: 'bold',
        margin: 0
    },
    subSlogan: {
        fontSize: '1.5em',
        margin: '10px 0 0 0'
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#ff6347',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.2em',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
    }
};

export default function Home() {
    return (
        <div style={styles.overlay}>
            <h1 style={styles.slogan}>Smak Raju</h1>
            <h6 style={styles.subSlogan}>Doświadcz kulinarnych uniesień</h6>
            <a href="menu" style={styles.button}>Sprawdź nasze menu</a>
        </div>
    );
}
