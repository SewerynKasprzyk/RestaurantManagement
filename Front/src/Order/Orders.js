import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from "../api/axiosConfig";


export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]); // Dodajemy nowy stan orderItems
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

    const formatTime = (time) => {
        // Zakładamy, że czas jest w formacie HH:mm:ss
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };


    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const response = await request('GET', `/api/orders/user/${user.id}`);

                    if (response.status === 200) {

                        const fetchedOrders = response.data;
                        const ordersWithItems = await Promise.all(
                            fetchedOrders.map(async (order) => {
                                    const itemsResponse = await request('GET', `/api/orderitems/order/${order.id}`);
                                    if (itemsResponse.status === 200) {
                                        return {...order, orderItems: itemsResponse.data};
                                    } else {
                                        console.error('Failed to fetch order items');
                                        return order;
                                    }
                                })
                            );
                        setOrders(ordersWithItems);
                    } else {
                        console.error('Failed to fetch orders');
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    setError('Błąd pobierania zamówień.');
                }
            }
            console.log(orders);
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
                            <p>Godzina: {formatTime(order.orderTime)}</p>
                            <p>Uwagi: {order.notes}</p>
                            <p>Kwota: {order.totalPrice}</p>
                            <p>Zamówione pozycje:</p>
                            <ul>
                                {order.orderItems.map((item, index) => (
                                    <li key={index}>
                                        <p>Nazwa: {item.menuItem.name}</p>
                                        <p>Cena: {item.menuItem.price}</p>
                                        <p>Ilość: {item.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak zamówień</p>
            )}
        </div>
    );
}
