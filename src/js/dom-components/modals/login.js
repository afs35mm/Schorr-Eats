import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Login = ({ toggleModal }) => (
    <div>
        <ModalHeader
            toggle={() => {
                toggleModal(null);
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    />
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                onClick={() => {
                    toggleModal(null);
                }}>
                Login
            </Button>
            <Button
                color="secondary"
                onClick={() => {
                    toggleModal(null);
                }}>
                Cancel
            </Button>
        </ModalFooter>
    </div>
);

Login.propTypes = {};

export default Login;
