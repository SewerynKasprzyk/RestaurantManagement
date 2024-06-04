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
            errors: {},
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value }, this.validateForm);
    };

    validateForm = () => {
        const errors = {};

        if (!this.state.name) {
            errors.name = 'Name is required';
        }

        if (!this.state.surname) {
            errors.surname = 'Last name is required';
        }

        if (!this.state.phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{9}$/.test(this.state.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 9 digits long';
        }

        if (!this.state.login) {
            errors.login = 'Username is required';
        }

        if (!this.state.password) {
            errors.password = 'Password is required';
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    onSubmitLogin = (event) => {
        event.preventDefault();
        this.state.onLogin(event, this.state.login, this.state.password);
    };

    onSubmitRegister = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            this.state.onRegister(
                event,
                this.state.name,
                this.state.surname,
                this.state.phoneNumber,
                this.state.login,
                this.state.password
            );
        }
    };

    render() {
        const allFieldsFilled = Object.values(this.state).slice(0, 5).every(value => value);

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
                                id="tab-register"
                                onClick={() => this.setState({ active: "register" })}
                            >
                                Register
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="ex1-content">
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login"
                        >
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="login"
                                        id="loginName"
                                        name="login"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="loginName">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        name="password"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                            </form>
                        </div>

                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register"
                        >
                            <form onSubmit={this.onSubmitRegister}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`form-control ${this.state.errors.name ? 'is-invalid' : ''}`}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="name">Name</label>
                                    {this.state.errors.name && <div className="invalid-feedback">{this.state.errors.name}</div>}
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        className={`form-control ${this.state.errors.surname ? 'is-invalid' : ''}`}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="surname">Last name</label>
                                    {this.state.errors.surname && <div className="invalid-feedback">{this.state.errors.surname}</div>}
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className={`form-control ${this.state.errors.phoneNumber ? 'is-invalid' : ''}`}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="phoneNumber">Phone number</label>
                                    {this.state.errors.phoneNumber && <div className="invalid-feedback">{this.state.errors.phoneNumber}</div>}
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="login"
                                        name="login"
                                        className={`form-control ${this.state.errors.login ? 'is-invalid' : ''}`}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="login">Username</label>
                                    {this.state.errors.login && <div className="invalid-feedback">{this.state.errors.login}</div>}
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control ${this.state.errors.password ? 'is-invalid' : ''}`}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-label" htmlFor="password">Password</label>
                                    {this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mb-4"
                                    disabled={!allFieldsFilled || Object.keys(this.state.errors).length > 0}
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
