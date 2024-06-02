import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken, request } from "./api/axiosConfig";

const PrivateRoute = ({ element, roles }) => {
    const [userPerms, setUserPerms] = useState("UNLOGGED");
    const [loading, setLoading] = useState(true);
    const token = getAuthToken();

    useEffect(() => {
        const fetchUserPerms = async () => {
            if (token) {
                try {
                    const response = await request('GET', '/api/users/me');
                    if (response.status === 200) {
                        const userData = response.data;
                        setUserPerms(userData.userType);
                        console.log("permission found: ", userData.userType);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false); // Set loading to false after the fetch is complete
                }
            } else {
                setLoading(false); // Set loading to false if no token is present
            }
        };

        fetchUserPerms();
    }, [token]);

    useEffect(() => {
        console.log("permission set: ", userPerms);
    }, [userPerms]);

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    if (token == null) {
        return <Navigate to="/loginTest" />;
    }

    if (!roles.includes(userPerms)) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default PrivateRoute;
