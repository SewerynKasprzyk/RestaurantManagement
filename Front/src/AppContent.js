import React, { Component } from 'react';
import AuthContent from "./loginPage/AuthContent";
import LoginForm from "./loginPage/LoginForm";
import WelcomeContent from "./loginPage/WelcomeContent";
import { request, setAuthToken } from "./api/axiosConfig";
import Buttons from "./loginPage/Buttons";
import UserComponent from "./loginPage/UserComponent";

export default class AppContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome",
            isLoggedIn: false // Track login status
        };
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    };

    logout = () => {
        this.setState({ componentToShow: "welcome", isLoggedIn: false }); // Update isLoggedIn state on logout
    }

    onLogin = (event, login, password) => {
        event.preventDefault();
        request("POST", "/login", { login, password })
            .then((response) => {
                this.setState({ componentToShow: "messages", isLoggedIn: true }); // Update isLoggedIn state on successful login
                setAuthToken(response.data.token);
            })
            .catch(() => {
                this.setState({ componentToShow: "welcome" });
            });
    }

    onRegister = (event, name, surname, phoneNumber, login, password) => {
        event.preventDefault();
        request("POST", "/register", { name, surname, phoneNumber, login, password })
            .then((response) => {
                this.setState({ componentToShow: "messages", isLoggedIn: true }); // Update isLoggedIn state on successful registration
                setAuthToken(response.data.token);
            })
            .catch(() => {
                this.setState({ componentToShow: "welcome" });
            });
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn && <UserComponent />} {/* Render UserComponent only when isLoggedIn is true */}
                <Buttons login={this.login} logout={this.logout} />
                {this.state.componentToShow === "welcome" && <WelcomeContent />}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
                {this.state.componentToShow === "messages" && <AuthContent />}
            </div>
        );
    }
}
