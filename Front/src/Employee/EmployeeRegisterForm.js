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
                            <input type="text" id="name" maxLength={50} name="name" className="form-control" onChange={this.onChangeHandler} />
                            <h6 className="form-label" htmlFor="name">Name</h6>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="surname" maxLength={50} name="surname" className="form-control" onChange={this.onChangeHandler} />
                            <h6 className="form-label" htmlFor="surname">Last name</h6>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="phoneNumber" maxLength={9} name="phoneNumber" className="form-control" onChange={this.onChangeHandler} />
                            <h6 className="form-label" htmlFor="phoneNumber">Phone number</h6>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="login" maxLength={50} name="login" className="form-control" onChange={this.onChangeHandler} />
                            <h6 className="form-label" htmlFor="login">Username</h6>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" maxLength={50} id="password" name="password" className="form-control" onChange={this.onChangeHandler} />
                            <h6 className="form-label" htmlFor="password">Password</h6>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Register Employee</button>
                    </form>
                </div>
            </div>
        );
    }
}