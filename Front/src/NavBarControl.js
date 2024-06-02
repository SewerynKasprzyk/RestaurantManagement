import React, { useEffect, useState } from "react";
import { getAuthToken, request } from "./api/axiosConfig";
import AdminNav from "./HomePage/AdminNav";
import EmployeeNav from "./HomePage/EmployeeNav";
import UnloggedNav from "./HomePage/UnloggedNav";
import CustomerNav from "./HomePage/CustomerNav";

const NavBarControl = () => {
    const token = getAuthToken();
    const [componentToShow, setComponentToShow] = useState("unlogged");
    const [userPerms, setUserPerms] = useState("null");

    if (token != null) {

        useEffect(() => {
            const fetchUserPerms = async () => {
                try {
                    const response = await request('GET', '/api/users/me');
                    if (response.status === 200) {
                        const userData = response.data;
                        setUserPerms(userData.userType);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserPerms();
        }, []);
    }

    useEffect(() => {
        if (userPerms === "ADMIN") {
            setComponentToShow("admin");
        } else if (userPerms === "EMPLOYEE") {
            setComponentToShow("employee");
        } else if (userPerms === "CUSTOMER") {
            setComponentToShow("customer");
        } else {
            setComponentToShow("unlogged");
        }

        console.log(userPerms);

    }, [userPerms]);

    return (
        <div>
            {componentToShow === "admin" && <AdminNav />}
            {componentToShow === "employee" && <EmployeeNav />}
            {componentToShow === "customer" && <CustomerNav />}
            {componentToShow === "unlogged" && <UnloggedNav />}
        </div>
    );
};

export default NavBarControl;
