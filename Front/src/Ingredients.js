import React, { useState, useEffect } from 'react';
import './Ingredients.css';

export function Ingredients() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [ingredientData, setIngredientData] = useState({name: '', amount: '', amountType: ''});
    const [isNewIngredient, setIsNewIngredient] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/ingredient')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIngredients(data);
            });
    }, []);

    const handleEdit = (ingredient) => {
        setIsNewIngredient(false);
        setSelectedIngredient(ingredient);
        setIngredientData(ingredient);
    };

    const handleAdd = () => {
        setIsNewIngredient(true);
        setSelectedIngredient(null);
        setIngredientData({name: '', amount: '', amountType: ''});
    };

    const handleInputChange = (event) => {
        setIngredientData({...ingredientData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const method = isNewIngredient ? 'POST' : 'PUT';
        const url = isNewIngredient ? `http://localhost:8080/api/ingredient/add` : `http://localhost:8080/api/ingredient/${selectedIngredient.id}`;

        const data = {
            ...ingredientData,
            amount: parseFloat(ingredientData.amount) // Konwertuj wartość amount na liczbę
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
                fetch('http://localhost:8080/api/ingredient')
                    .then(response => response.json())
                    .then(data => setIngredients(data));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDelete = (ingredient) => {
        fetch(`http://localhost:8080/api/ingredient/${ingredient.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Usuń element z lokalnej listy składników po pomyślnym usunięciu na serwerze
                setIngredients(ingredients.filter(ingredientItem => ingredientItem.id !== ingredient.id));
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container my-4">
            <h2 className="text-white text-center mb-4">Składniki</h2>
            <button className="btn btn-primary mb-3" onClick={handleAdd}>Add New Ingredient</button>
            <ul className="list-group">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{ingredient.name}</h5>
                        </div>
                        <div>{ingredient.amount} {ingredient.amountType}</div>
                        <div>
                            <button className="btn btn-secondary mr-2" onClick={() => handleEdit(ingredient)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(ingredient)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {(selectedIngredient || isNewIngredient) && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <h6>Name:</h6>
                        <input type="text" className="form-control" name="name" value={ingredientData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <h6>Amount:</h6>
                        <input type="text" className="form-control" name="amount" value={ingredientData.amount} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <h6>Amount Type:</h6>
                        <select className="form-control" name="amountType" value={ingredientData.amountType} onChange={handleInputChange}>
                            <option value="GRAMS">GRAMS</option>
                            <option value="MILLILITERS">MILLILITERS</option>
                            <option value="PIECES">PIECES</option>
                        </select>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success" />
                </form>
            )}
        </div>
    );
}

export default Ingredients;