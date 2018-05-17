// import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';

import RatingsTable from './ratings-table';
import NavBar from './dom-components/nav-bar';
import Modal from './dom-components/modal';

import '../styles/index.scss';

class SchorrEats extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            modalType: null,
            isLoggedIn: !!props.dataBs.user,
            user: props.dataBs.user,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    setLoggedInUser(user) {
        this.setState({ user, isLoggedIn: true });
    }

    toggleModal(modalType) {
        const showModal = !!modalType;
        this.setState({
            modalType,
            showModal,
        });
    }

    render() {
        let successCb = null;
        if (this.state.modalType === 'login') {
            successCb = this.setLoggedInUser.bind(this);
        } else if (this.state.modalType === 'addRestaurant') {
            successCb = () => {};
        }
        let loggedInFooter = null;
        if (this.state.isLoggedIn) {
            loggedInFooter = (
                <div>
                    <hr />
                    <button
                        onClick={() => this.toggleModal('addRestaurant')}
                        type="button"
                        className="add-restaurant btn btn-primary">
                        Add Restaurant
                    </button>
                </div>
            );
        }
        return (
            <div>
                <Modal
                    modalType={this.state.modalType}
                    showModal={this.state.showModal}
                    toggleModal={this.toggleModal}
                    successCb={successCb}
                />
                <NavBar
                    toggleModal={this.toggleModal}
                    isLoggedIn={this.state.isLoggedIn}
                    user={this.state.user}
                />
                <div className="container-fluid">
                    <RatingsTable isLoggedIn={this.state.isLoggedIn} />
                    {loggedInFooter}
                </div>
            </div>
        );
    }
}
ReactDOM.render(<SchorrEats dataBs={dataBs} />, document.getElementById('index'));
