import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
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
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(modalType) {
        const showModal = !!modalType;
        this.setState({
            modalType,
            showModal,
        });
    }
    render() {
        return (
            <div>
                <Modal
                    modalType={this.state.modalType}
                    showModal={this.state.showModal}
                    toggleModal={this.toggleModal}
                />
                <NavBar toggleModal={this.toggleModal} />
                <div className="container-fluid">
                    <RatingsTable />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<SchorrEats />, document.getElementById('index'));
