import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleModal: props.toggleModal,
            email: '',
            password: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
    }

    loginReq({ email, password }) {
        console.log(this);
        console.log(email);
        console.log(password);
        fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePassWordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div>
                <ModalHeader
                    toggle={() => {
                        this.state.toggleModal(null);
                    }}>
                    Login
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePassWordChange}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            // toggleModal(null);
                            this.loginReq({
                                email: this.state.email,
                                password: this.state.password,
                            });
                        }}>
                        Login
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.state.toggleModal(null);
                        }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </div>
        );
    }
}

Login.propTypes = {
    toggleModal: PropTypes.func.isRequired,
};

export default Login;
