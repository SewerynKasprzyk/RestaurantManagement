import React, { useState, useEffect } from 'react';

export function EditMenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [menuItemData, setMenuItemData] = useState({name: '', type: '', price: '', description: ''});
    const [isNewItem, setIsNewItem] = useState(false);

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
        <div>
            <h2>Menu Items</h2>
            <button onClick={handleAdd}>Add New Item</button>
            <ul>
                {Array.isArray(menuItems) && menuItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item)}>Delete</button>
                    </li>
                ))}
            </ul>

            {(selectedItem || isNewItem) && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={menuItemData.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Type:
                        <select name="type" value={menuItemData.type} onChange={handleInputChange}>
                            {menuItemTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" value={menuItemData.price} onChange={handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={menuItemData.description} onChange={handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            )}
        </div>
    );
}

export default EditMenuItems;