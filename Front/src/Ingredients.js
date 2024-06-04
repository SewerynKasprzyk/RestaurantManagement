import React, { useState, useEffect } from 'react';
import './Ingredients.css';
// !!! TO DO !!!
// ZROBIC ŻEBY ADMIN TYLKO MOGL TO OGLADAC

// Komponent wyświetlający składniki
export function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Liczba elementów na stronę


    useEffect(() => {
        fetch('http://localhost:8080/api/ingredient')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Dodaj logowanie do konsoli
                setIngredients(data);
            });
    }, []);

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = ingredients.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < ingredients.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (indexOfFirstItem > 0) {
            setCurrentPage(currentPage - 1);
        }
    };


  return (
    <div className = "container my-4">
      <h2 className="text-white text-center mb-4">Składniki</h2>
      <ul className="list-group">

        {currentItems.map((ingredient, index) => (


          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
                <h5 className="mb-1"> {ingredient.name}</h5>
          </div>
           <div>{ingredient.amount} {ingredient.amountType}</div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredients;