import _ from 'lodash';
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
            curRestaurant: null,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    setLoggedInUser(user) {
        console.log(user);
        this.setState({ user, isLoggedIn: true });
    }

    toggleModal(modalType) {
        const showModal = !!modalType;
        const newState = {
            modalType,
            showModal,
        };
        if (!modalType && typeof this.state.curRestaurant === 'object') {
            newState.curRestaurant = null;
        }
        this.setState(newState);
    }

    editRestaurant(id) {
        fetch(`/api/restaurants/${id}`)
            .then(resp => resp.json())
            .then(resp => {
                const { cuisine, date, dateReadable, location, name } = resp;
                const rating = _.find(resp.ratings, { author: this.state.user.shortName });
                this.setState({
                    curRestaurant: {
                        cuisine,
                        date,
                        dateReadable,
                        location,
                        name,
                        rating,
                    },
                });
                this.toggleModal('restaurant');
            });
    }

    render() {
        let successCb;
        if (this.state.modalType === 'login') {
            successCb = this.setLoggedInUser.bind(this);
        } else {
            successCb = null;
        }
        let loggedInFooter = null;
        if (this.state.isLoggedIn) {
            loggedInFooter = (
                <div>
                    <hr />
                    <button
                        onClick={() => this.toggleModal('restaurant')}
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
                    user={this.state.user}
                    curRestaurant={this.state.curRestaurant}
                />
                <NavBar
                    toggleModal={this.toggleModal}
                    isLoggedIn={this.state.isLoggedIn}
                    user={this.state.user}
                />
                <div className="container-fluid">
                    <RatingsTable
                        isLoggedIn={this.state.isLoggedIn}
                        editRestaurant={this.editRestaurant.bind(this)}
                    />
                    {loggedInFooter}
                </div>
            </div>
        );
    }
}
ReactDOM.render(<SchorrEats dataBs={dataBs} />, document.getElementById('index'));
