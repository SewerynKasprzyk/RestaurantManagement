import React, { useState, useEffect } from 'react';

// Komponent wyświetlający menu
export default function MenuItems() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {

        const fetachMenu = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/menu');

                if (!response.ok) {
                    throw new Error('Błąd pobierania menu');
                }

                const data = await response.json();

                setMenuItems(data);
            } catch (error) {
                console.error('Error: Błąd pobierania danych z menu', error);
            }
        };

        fetachMenu();
    },[]);


    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>{item.name} - {item.price} PLN - {item.description}</li>
                ))}
            </ul>
        </div>
    );

}