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
        fetch('/users/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
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
                                onKeyPress={e => {
                                    console.log(e.keyCode);
                                    console.log(e);
                                    // if (e.keyCode === 13) {
                                    //     this.loginReq({
                                    //         email: this.state.email,
                                    //         password: this.state.password,
                                    //     });
                                    // }
                                }}
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
