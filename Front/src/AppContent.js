import  * as React from 'react';
import AuthContent from "./loginPage/AuthContent";
import LoginForm from "./loginPage/LoginForm";
import WelcomeContent from "./loginPage/WelcomeContent";

import {request, setAuthToken} from "./api/axiosConfig";
import Buttons from "./loginPage/Buttons";

export default class AppContent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                componentToShow: "welcome"
            };
        };

        login = () => {
            this.setState({componentToShow: "login"});
        };

        logout = () => {
            this.setState({componentToShow: "welcome"});
        }

        onLogin = (event, login, password) => {
            event.preventDefault();
            request("POST",
                "/login",
                {
                    login: login,
                    password: password
                }
                ).then((response) => {
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token);
            }).catch((error) => {
                this.setState({componentToShow: "welcome"});
            });
        }

        onRegister = (event, name, surname, phoneNumber, login, password) => {
            event.preventDefault();
            request("POST",
                "/register",
                {
                    name: name,
                    surname: surname,
                    phoneNumber: phoneNumber,
                    login: login,
                    password: password
                }
                ).then((response) => {
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token);
            }).catch((error) => {
                this.setState({componentToShow: "welcome"});
            });

        }
    render()
    {
        return (
            <div>
                <Buttons login = {this.login} logout = {this.logout}/>

                {this.state.componentToShow === "welcome" && <WelcomeContent/>}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister}/>}
                {this.state.componentToShow === "messages" && <AuthContent/>}
            </div>
        );
    }
}