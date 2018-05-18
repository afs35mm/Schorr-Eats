import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const genericErrorMessage = {
    error: true,
    errorMessage: 'Whoops, something went wrong.',
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleModal: props.toggleModal,
            email: '',
            password: '',
            error: false,
            errorMessage: null,
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.successCb = this.props.successCb.bind(this);
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
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json();
                } else if (resp.status === 401) {
                    return {
                        error: true,
                        errorMessage: 'Invalid username/password combination.',
                    };
                }
                return genericErrorMessage;
            })
            .then(data => {
                if (data.error) {
                    this.setState(data);
                } else {
                    this.successCb(data);
                    this.state.toggleModal(null);
                }
            })
            .catch(err => {
                this.setState(genericErrorMessage);
            });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePassWordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        const error = this.state.error ? (
            <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
            </div>
        ) : null;
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
                            {error}
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePassWordChange}
                                onKeyPress={e => {
                                    if (e.charCode === 13) {
                                        this.loginReq({
                                            email: this.state.email,
                                            password: this.state.password,
                                        });
                                    }
                                }}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
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
