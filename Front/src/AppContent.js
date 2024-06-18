import React, { Component } from 'react';
import AuthContent from "./loginPage/AuthContent";
import LoginForm from "./loginPage/LoginForm";
import WelcomeContent from "./loginPage/WelcomeContent";
import { getAuthToken, removeAuthToken, request, setAuthToken } from "./api/axiosConfig";
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

    componentDidMount() {
        this.updateIsLoggedInState();
    }

    login = () => {
        this.updateIsLoggedInState(() => {
            this.setState({ componentToShow: this.state.isLoggedIn ? "messages" : "login" });
        });
    };

    logout = () => {
        removeAuthToken();
        this.setState({ componentToShow: "welcome", isLoggedIn: false }, () => {
            setTimeout(() => window.location.reload(), 100); // Delay to ensure state updates before reload
        });
    };

    onLogin = (event, login, password) => {
        event.preventDefault();
        request("POST", "/login", { login, password })
            .then((response) => {
                setAuthToken(response.data.token);
                this.setState({ componentToShow: "messages", isLoggedIn: true }, () => {
                    setTimeout(() => window.location.reload(), 100); // Delay to ensure state updates before reload
                });
            })
            .catch(() => {
                this.setState({ componentToShow: "welcome", isLoggedIn: false });
            });
    };

    onRegister = (event, name, surname, phoneNumber, login, password) => {
        event.preventDefault();
        request("POST", "/register", { name, surname, phoneNumber, login, password })
            .then((response) => {
                setAuthToken(response.data.token);
                this.setState({ componentToShow: "messages", isLoggedIn: true }, () => {
                    setTimeout(() => window.location.reload(), 100); // Delay to ensure state updates before reload
                });
            })
            .catch(() => {
                this.setState({ componentToShow: "welcome", isLoggedIn: false });
            });
    };

    updateIsLoggedInState = (callback) => {
        const isLoggedIn = getAuthToken() != null;
        this.setState({ isLoggedIn, componentToShow: isLoggedIn ? "messages" : "welcome" }, callback);
    };

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
