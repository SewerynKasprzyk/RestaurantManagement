import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from "../api/axiosConfig";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
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

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const response = await request('GET', `/api/orders/user/${user.id}`);

                    if (response.status === 200) {
                        setOrders(response.data);
                    } else {
                        console.error('Failed to fetch orders');
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    setError('Błąd pobierania zamówień.');
                }
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div className='orders-container'>
            <h2>Twoje zamówienia</h2>
            <button onClick={() => navigate('/orders/add')}>Dodaj zamówienie</button>

            {error && <div className="error">{error}</div>}

            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>Data: {order.orderDate}</p>
                            <p>Godzina zamówienia: {order.orderTime}</p>
                            <p>Uwagi: {order.notes}</p>
                            <p>Kwota: {order.totalAmount}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak zamówień</p>
            )}
        </div>
    );
}
