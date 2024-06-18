import {useEffect, useState} from "react";
import { getAuthToken, request } from "../api/axiosConfig";

export default function Kitchen() {
    const [orders, setOrders] = useState([]);


    const fetchOrders = async () => {
        try {
            const response = await request('GET', '/api/orders/kitchen');

            if (response.status === 200) {
                setOrders(response.data);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();

        const intervalId = setInterval(fetchOrders, 60000); // Odświeżaj co 60 sekund

        return () => clearInterval(intervalId); // Wyczyść interval po odmontowaniu komponentu
    }, []);

    const handleMarkAsServed = async (orderId) => {
        try {
            const response = await request('POST', `/api/orders/${orderId}`);

            if (response.status === 200) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId ? { ...order, isServed: true } : order
                    )
                );
            } else {
                console.error('Failed to update order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };


    return (
        <div className="container my-4">
            <h2 className="text-white text-center mb-4">Kitchen</h2>
            <div className="row">
                {orders.map(order => (
                    <div key={order.id} className="col-md-6 mb-4">
                        <div className="card bg-light">
                            <div className="card-header">
                                <h5 className="card-title">Order ID: {order.id}</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Notes:</strong> {order.notes}</p>
                                <p><strong>Order Date:</strong> {order.orderDate}</p>
                                <p><strong>Order Time:</strong> {order.orderTime}</p>
                                <p><strong>Is Served:</strong> {order.isServed ? "Yes" : "No"}</p>
                                {!order.isServed && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleMarkAsServed(order.id)}
                                    >
                                        Mark as Served
                                    </button>
                                )}
                                <h6>Order Items:</h6>
                                <ul className="list-group">
                                    {order.orderItems.map(item => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">{item.menuItem.name}</h6>
                                                <small>{item.menuItem.description}</small>
                                            </div>
                                            <span className="badge bg-secondary rounded-pill">Qty: {item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
