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
       <div className='container mt-4'>
                   <h2>Twoje zamówienia</h2>
                   <button className='btn btn-primary mb-3' onClick={() => navigate('/orders/add')}>Dodaj zamówienie</button>

                   {error && <div className="alert alert-danger">{error}</div>}

                   {orders.length > 0 ? (
                       <div className='row'>
                           {orders.map((order) => (
                               <div className='col-md-4 mb-4' key={order.id}>
                                   <div className='card'>
                                       <div className='card-body'>
                                           <h5 className='card-title'>Data: {order.orderDate}</h5>
                                           <h6 className='card-subtitle mb-2 text-muted'>Godzina: {formatTime(order.orderTime)}</h6>
                                           <p className='card-text'>Uwagi: {order.notes}</p>
                                           <p className='card-text'>Kwota: {order.totalPrice} zł</p>
                                           <p className='card-text'>Zamówione pozycje:</p>
                                           <ul className='list-group list-group-flush'>
                                               {order.orderItems.map((item, index) => (
                                                   <li key={index} className='list-group-item'>
                                                       <p>Nazwa: {item.menuItem.name}</p>
                                                       <p>Cena: {item.menuItem.price} zł</p>
                                                       <p>Ilość: {item.quantity}</p>
                                                   </li>
                                               ))}
                                           </ul>
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   ) : (
                       <p>Brak zamówień</p>
                   )}
               </div>
    );
}
