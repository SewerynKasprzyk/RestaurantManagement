import React, {useState, useEffect} from 'react';

// Komponent wyświetlający rezerwacje
export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/reservations');
                if (!response.ok) {
                    throw new Error('Błąd pobierania rezerwacji');
                }

                const data = await response.json();

                setReservations(data);
            } catch (error) {
                console.error('Error: Błąd pobierania rezerwacji', error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className='reservation-container'>
            <h2>Twoje rezerwacje</h2>
            <button onClick={() => window.location.href = '/reservation/add'}>Dodaj rezerwację</button>

            {error && <div className="error">{error}</div>}
        </div>
    );
}
//     fetch('http://localhost:8080/api/reservations')
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Błąd pobierania strony rezerwacji');
//             }
//         })
//         .then(data => {
//             setReservations(data);
//             setError('');
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             setError('Błąd pobierania rezerwacji. Spróbuj ponownie.');
//         });
// }, []);

// return (
//     <div className='reservation-container'>
//         <h2>Twoje rezerwacje</h2>
//         <button onClick={() => window.location.href = '/reservation/add'}>Dodaj rezerwację</button>
//
//
//         {error && <div className="error">{error}</div>}
//     </div>
// );
//}