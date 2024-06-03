import * as React from 'react';

export default class EmployeeRegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            phoneNumber: "",
            login: "",
            password: "",
            onRegister: props.onRegister
        }
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitRegister = (event) => {
        event.preventDefault();
        this.state.onRegister(
            event,
            this.state.name,
            this.state.surname,
            this.state.phoneNumber,
            this.state.login,
            this.state.password
        );
    }

    render() {
        return (
            <div className="row justify-content-center" style={{marginTop:"1rem"}}>
                <div className="col-4">
                    <form onSubmit={this.onSubmitRegister}>
                        <div className="form-outline mb-4">
                            <input type="text" id="name" name="name" className="form-control" onChange={this.onChangeHandler} />
                            <label className="form-label" htmlFor="name">Name</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="surname" name="surname" className="form-control" onChange={this.onChangeHandler} />
                            <label className="form-label" htmlFor="surname">Last name</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" onChange={this.onChangeHandler} />
                            <label className="form-label" htmlFor="phoneNumber">Phone number</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="login" name="login" className="form-control" onChange={this.onChangeHandler} />
                            <label className="form-label" htmlFor="login">Username</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="password" name="password" className="form-control" onChange={this.onChangeHandler} />
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Register Employee</button>
                    </form>
                </div>
            </div>
        );
    }
}