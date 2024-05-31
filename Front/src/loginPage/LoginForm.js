import * as React from 'react';
import classNames from 'classnames';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            name: "",
            surname: "",
            phoneNumber: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        }
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    onSubmitLogin = (event) => {
        event.preventDefault();
        this.state.onLogin(event, this.state.login, this.state.password);
    };

    onSubmitRegister = (event) => {
        this.state.onRegister(
            event,
            this.state.name,
            this.state.surname,
            this.state.phoneNumber,
            this.state.login,
            this.state.password);
    }

    render() {
        return (

            <div className="row justify-content-center">
                <div className="col-4">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                                id="tab-login" onClick={() => this.setState({active:"login"})}>Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
                                id="tab-register" onClick={() => this.setState({active:"register"})}>Register
                            </button>
                        </li>

                    </ul>

                    <div className="tab-content" id="ex1-content">
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login">
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form-outline mb-4">
                                    <input type="login" id="loginName" name="login" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginName">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                            </form>
                        </div>

                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register">
                            <form onSubmit={this.onSubmitRegister}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="name" name="name" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="name">Name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="surname" name="surname" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="surname">Last name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="phoneNumber" name="phoneNumber" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="phoneNumber">Phone number</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="login" name="login" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="login">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="password" name="password" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}