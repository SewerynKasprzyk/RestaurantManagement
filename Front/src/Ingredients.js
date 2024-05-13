import React, { useState, useEffect } from 'react';

// !!! TO DO !!!
// ZROBIC ŻEBY ADMIN TYLKO MOGL TO OGLADAC

// Komponent wyświetlający składniki
export function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/ingredient')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Dodaj logowanie do konsoli
                setIngredients(data);
            });
    }, []);

  return (
    <div>
      <h2>Składniki</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - {ingredient.amount} {ingredient.amountType}</li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredients;