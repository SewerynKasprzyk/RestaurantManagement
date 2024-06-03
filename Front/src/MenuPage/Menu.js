import React, { useState, useEffect } from 'react';

// Komponent wyświetlający menu
export default function MenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Liczba elementów na stronę

    useEffect(() => {

        const fetchMenu = async () => {
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

        fetchMenu();
    },[]);

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < menuItems.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (indexOfFirstItem > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className = "container my-4">
            <h2 className="text-white text-center mb-4">Menu</h2>
            <ul className="list-group">
                {currentItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1"> {item.name}</h5>
                            <small>{item.description}</small>
                        </div>
                        <span className="badge bg-primary rounded-pill">{item.price} PLN</span>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary" onClick={prevPage} disabled={indexOfFirstItem === 0}>Poprzedni</button>
                <button className="btn btn-primary" onClick={nextPage} disabled={indexOfLastItem >= menuItems.length}>Następny</button>
            </div>
        </div>
    );

}