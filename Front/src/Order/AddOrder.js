import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getAuthToken, request} from '../api/axiosConfig';


export default function AddOrder() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [notes, setNotes] = useState('');
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
                    setUserId(userData.id);
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

    const handleAddOrder = async () => {
        if (!user) {
            setError('Nie można dodać zamówienia bez zalogowanego użytkownika.');
            return;
        }

        const order = {
            totalPrice,
            notes : notes || 'Brak',
            userId,
            orderItems: Object.values(selectedItems).map(item => ({
                menuItemId: item.id,
                quantity: item.quantity
            }))
        };

        try {
            console.log(order);
            const response = await request('post', '/api/orders/add', order, getAuthToken());
            if (response.status === 200) {
                navigate('/orders');
            } else {
                throw new Error('Błąd dodawania zamówienia');
            }
        } catch (error) {
            setError('Błąd dodawania zamówienia. Spróbuj ponownie.');
        }
    };

    const handleAddItem = (item) => {
        const updatedItems = { ...selectedItems };
        if (updatedItems[item.id]) {
            updatedItems[item.id].quantity += 1;
        } else {
            updatedItems[item.id] = { ...item, quantity: 1 };
        }
        setSelectedItems(updatedItems);
        updateTotalPrice(updatedItems);
    };

    const handleRemoveItem = (itemId) => {
        const updatedItems = { ...selectedItems };
        if (updatedItems[itemId].quantity > 1) {
            updatedItems[itemId].quantity -= 1;
        } else {
            delete updatedItems[itemId];
        }
        setSelectedItems(updatedItems);
        updateTotalPrice(updatedItems);
    };

    const updateTotalPrice = (items) => {
        const total = Object.values(items).reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        setTotalPrice(total.toFixed(2));
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
            <div key={category} className="category mb-4">
                <h3>{getCategoryName(category)}</h3>
                <div className="row">
                    {menuItems
                        .filter(item => item.category === category)
                        .map(item => (
                            <div key={item.id} className="col-md-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.name}</h4>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">Cena: {item.price} PLN</p>
                                        <button className="btn btn-primary" onClick={() => handleAddItem(item)}>Dodaj</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        ));
    };

    return (
<div className="container mt-4">
            <h2>Dodaj zamówienie</h2>
            {renderMenuItemsByCategory()}
            <div>
                <h3>Wybrane dania:</h3>
                {Object.values(selectedItems).map((item) => (
                    <div key={item.id} className="card mb-3">
                        <div className="card-body">
                            <p className="card-text">{`${item.name} - ${item.price} PLN`}</p>
                            <p className="card-text">Ilość: {item.quantity}</p>
                            <button className="btn btn-success me-2" type="button" onClick={() => handleAddItem(item)}>+</button>
                            <button className="btn btn-danger" type="button" onClick={() => handleRemoveItem(item.id)}>-</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h3>Łączna kwota: {totalPrice} PLN</h3>
                <textarea
                    className="form-control mb-3"
                    placeholder="Dodaj notatki do zamówienia"
                    value={notes}
                    maxLength={50}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mb-3" type='button' onClick={handleAddOrder}>Dodaj zamówienie</button>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}