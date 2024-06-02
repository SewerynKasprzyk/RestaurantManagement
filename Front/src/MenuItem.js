import React, { useState, useEffect } from 'react';

export function EditMenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [menuItemData, setMenuItemData] = useState({name: '', type: '', price: '', description: ''});

    useEffect(() => {
        fetch('http://localhost:8080/api/menu')
            .then(response => response.json())
            .then(data => setMenuItems(data));
    }, []);

    useEffect(() => {
        if (selectedItem) {
            setMenuItemData(selectedItem);
        }
    }, [selectedItem]);

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleInputChange = (event) => {
        setMenuItemData({...menuItemData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/menu/${selectedItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuItemData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.statusText);
                }
            })
            .then(data => {
                console.log('Success:', data);
                // Ponownie pobierz dane po pomyślnym zaktualizowaniu
                fetch('http://localhost:8080/api/menu')
                    .then(response => response.json())
                    .then(data => setMenuItems(data));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h2>Menu Items</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                    </li>
                ))}
            </ul>
            {selectedItem && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={menuItemData.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="type" value={menuItemData.type} onChange={handleInputChange} />
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