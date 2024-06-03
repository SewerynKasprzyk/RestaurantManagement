import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../api/axiosConfig';
import './AddOrder.css'; // Importujemy plik CSS

export default function AddOrder() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [user, setUser] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request('GET', '/api/users/me');
                if (response.status === 200) {
                    const userData = response.data;
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchMenuItems = async () => {
            try {
                const response = await request('GET', '/api/menu');
                if (response.status === 200) {
                    setMenuItems(response.data);
                } else {
                    console.error('Failed to fetch menu items');
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setError('Błąd pobierania pozycji menu.');
            }
        };

        fetchUser();
        fetchMenuItems();
    }, []);

    const handleAddItem = (item) => {
        const updatedItems = { ...selectedItems };
        if (updatedItems[item.id]) {
            updatedItems[item.id].quantity += 1;
        } else {
            updatedItems[item.id] = { ...item, quantity: 1 };
        }
        setSelectedItems(updatedItems);
        updateTotalAmount(updatedItems);
    };

    const handleRemoveItem = (itemId) => {
        const updatedItems = { ...selectedItems };
        if (updatedItems[itemId].quantity > 1) {
            updatedItems[itemId].quantity -= 1;
        } else {
            delete updatedItems[itemId];
        }
        setSelectedItems(updatedItems);
        updateTotalAmount(updatedItems);
    };

    const updateTotalAmount = (items) => {
        const total = Object.values(items).reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        setTotalAmount(total.toFixed(2));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('Nie można dodać zamówienia bez zalogowanego użytkownika.');
            return;
        }

        const order = {
            totalAmount,
            user,
            items: Object.values(selectedItems)
        };

        try {
            const response = await request('POST', '/api/orders/add', order);
            if (response.status === 200) {
                navigate('/');
            } else {
                throw new Error('Błąd dodawania zamówienia');
            }
        } catch (error) {
            setError('Błąd dodawania zamówienia. Spróbuj ponownie.');
        }
    };

    const getCategoryName = (category) => {
        if (category === 'MAIN_COURSE') {
            return 'Dania główne';
        } else if (category === 'APPETIZER') {
            return 'Przystawki';
        } else if (category === 'BEVERAGE') {
            return 'Napoje';
        } else {
            return category;
        }
    };

    const renderMenuItemsByCategory = () => {
        const categories = Array.from(new Set(menuItems.map(item => item.category)));
        return categories.map(category => (
            <div key={category} className="category">
                <h3>{getCategoryName(category)}</h3>
                <div className="menu-items-grid">
                    {menuItems
                        .filter(item => item.category === category)
                        .map(item => (
                            <div key={item.id} className="card">
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <p>Cena: {item.price} PLN</p>
                                <button onClick={() => handleAddItem(item)}>Dodaj</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        ));
    };

    return (
        <div className='add-order-container'>
            <h2>Dodaj zamówienie</h2>
            <form onSubmit={handleSubmit}>
                {renderMenuItemsByCategory()}
                <div>
                    <h3>Wybrane dania:</h3>
                    {Object.values(selectedItems).map((item) => (
                        <div key={item.id} className="selected-item">
                            <p>{`${item.name} - ${item.price} PLN`}</p>
                            <p>Ilość: {item.quantity}</p>
                            <button type="button" onClick={() => handleAddItem(item)}>+</button>
                            <button type="button" onClick={() => handleRemoveItem(item.id)}>-</button>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Łączna kwota: {totalAmount} PLN</h3>
                </div>
                <button type='submit'>Dodaj zamówienie</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}