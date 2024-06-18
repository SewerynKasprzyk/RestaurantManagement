import React, { useState, useEffect } from 'react';

export function EditMenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [menuItemData, setMenuItemData] = useState({name: '', type: '', price: '', description: ''});
    const [isNewItem, setIsNewItem] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [menuItemTypes, setMenuItemTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/menu')
            .then(response => response.json())
            .then(data => setMenuItems(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/menu/types')
            .then(response => response.json())
            .then(data => setMenuItemTypes(data));
    }, []);

    useEffect(() => {
        if (selectedItem) {
            setMenuItemData(selectedItem);
        }
    }, [selectedItem]);

    const handleEdit = (item) => {
        setIsNewItem(false);
        setSelectedItem(item);
    };

    const handleAdd = () => {
        setIsNewItem(true);
        setSelectedItem(null);
        setMenuItemData({name: '', type: '', price: '', description: ''});
    };

    const handleInputChange = (event) => {
        setMenuItemData({...menuItemData, [event.target.name]: event.target.value});
        console.log(menuItemData.type);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const method = isNewItem ? 'POST' : 'PUT';
        const url = isNewItem ? `http://localhost:8080/api/menu/add` : `http://localhost:8080/api/menu/${selectedItem.id}`;

        // Sprawdź, czy wartość type jest prawidłowa
        if (!['APPETIZER', 'MAIN_COURSE', 'DESSERT', 'BEVERAGE'].includes(menuItemData.type)) {
            console.log(menuItemData.type);
            console.error('Invalid type value');
            return;
        }

        const data = {
            ...menuItemData,
            price: parseFloat(menuItemData.price) // Konwertuj wartość price na liczbę
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Sprawdź, czy odpowiedź nie jest pusta
                return response.text().then(text => text ? JSON.parse(text) : {})
            })
            .then(data => {
                console.log('Success:', data);
                fetch('http://localhost:8080/api/menu')
                    .then(response => response.json())
                    .then(data => setMenuItems(data));
                console.log(menuItemData.type);
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log(menuItemData.type);
            });
    };

    const handleDelete = (item) => {
        fetch(`http://localhost:8080/api/menu/${item.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Usuń element z lokalnej listy menu po pomyślnym usunięciu na serwerze
                setMenuItems(menuItems.filter(menuItem => menuItem.id !== item.id));
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container mt-4">
                <h2 className="mb-3">Menu Items</h2>
                <button className="btn btn-primary mb-3" onClick={handleAdd}>Add New Item</button>
                <ul className="list-group">
                    {Array.isArray(menuItems) && menuItems.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} - {item.price}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn gap-2 btn-secondary  mr-2" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-danger gap-2" onClick={() => handleDelete(item)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

                {(selectedItem || isNewItem) && (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="form-group">
                            <h6>Name:</h6>
                            <input type="text" className="form-control" name="name" value={menuItemData.name} onChange={handleInputChange} maxLength="20" />
                        </div>
                        <div className="form-group">
                            <h6>Type:</h6>
                            <select className="form-control" name="type" value={menuItemData.type} onChange={handleInputChange}>
                                {menuItemTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <h6>Price:</h6>
                            <input type="text" className="form-control" name="price" value={menuItemData.price} onChange={handleInputChange} maxLength="10" />
                        </div>
                        <div className="form-group">
                            <h6>Description:</h6>
                            <input type="text" className="form-control" name="description" value={menuItemData.description} onChange={handleInputChange} maxLength="50" />
                        </div>
                        <input type="submit" value="Submit" className="btn btn-success" />
                    </form>
                )}
            </div>
    );
}

export default EditMenuItems;