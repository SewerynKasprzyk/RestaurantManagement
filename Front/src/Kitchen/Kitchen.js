import {useEffect, useState} from "react";
import { getAuthToken, request } from "../api/axiosConfig";

export default function Kitchen() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
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

        fetchOrders();
    },[]);

    return (
        <div>
            <h1>Kitchen</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <h2>Order ID: {order.id}</h2>
                        <p>Total Price: {order.totalPrice}</p>
                        <p>Notes: {order.notes}</p>
                        <p>Order Date: {order.orderDate}</p>
                        <p>Order Time: {order.orderTime}</p>
                        <p>Is Served: {order.isServed ? "Yes" : "No"}</p>
                        <h3>Order Items:</h3>
                        <ul>
                            {order.orderItems.map(item => (
                                <li key={item.id}>
                                    <p>Item Name: {item.menuItem.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Description: {item.menuItem.description}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
