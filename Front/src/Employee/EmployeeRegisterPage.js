import React, { Component } from 'react';
import { request } from "../api/axiosConfig";
import EmployeeRegisterForm from "./EmployeeRegisterForm";

export default class EmployeeRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "register",
            registrationSuccess: false
        };
    }

    onRegister = (event, name, surname, phoneNumber, login, password) => {
        event.preventDefault();
        request("POST", "/registerEmployee", { name, surname, phoneNumber, login, password })
            .then(() => {
                this.setState({ registrationSuccess: true });
            })
            .catch(() => {
                this.setState({ registrationSuccess: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.registrationSuccess ? (
                    <div className="alert alert-success" role="alert">
                        Employee registered successfully!
                    </div>
                ) : (
                    <EmployeeRegisterForm onRegister={this.onRegister} />
                )}
            </div>
        );
    }
}
