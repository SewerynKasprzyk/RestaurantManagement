import React, { useEffect, useState } from 'react';
import { getAuthToken, setAuthToken, request } from '../api/axiosConfig'; // Import your Axios request function

const UserComponent = () => {
    const [userName, setUserName] = useState('');
    const token = getAuthToken(); // Replace this with the actual JWT token

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request('GET', '/api/users/me');

                if (response.status === 200) {
                    const userData = response.data;
                    setUserName(userData.name); // Adjust according to the UserDto field

                    // Set the JWT token into local storage
                    //setAuthToken(response.data.token);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>Welcome, {userName}</h1>
        </div>
    );
};

export default UserComponent;
