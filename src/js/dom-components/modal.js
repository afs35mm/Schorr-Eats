import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import LoginModal from './modals/login';
import AddRestaurantModal from './modals/add-restaurant';

const DomModal = ({ modalType, showModal, toggleModal, successCb, user }) => {
    let modalContent;
    switch (modalType) {
        case 'login':
            modalContent = <LoginModal toggleModal={toggleModal} successCb={successCb} />;
            break;
        case 'addRestaurant':
            modalContent = (
                <AddRestaurantModal toggleModal={toggleModal} successCb={successCb} user={user} />
            );
            break;
        default:
            modalContent = null;
    }

    return (
        <div>
            <Modal
                isOpen={showModal}
                toggle={() => {
                    toggleModal(null);
                }}>
                {modalContent}
            </Modal>
        </div>
    );
};

DomModal.propTypes = {
    modalType: PropTypes.string,
    showModal: PropTypes.bool,
    toggleModal: PropTypes.func.isRequired,
    successCb: PropTypes.func,
    user: PropTypes.shape({
        prettyUsername: PropTypes.string,
        shortName: PropTypes.string,
        username: PropTypes.string,
    }),
};

DomModal.defaultProps = {
    modalType: '',
    showModal: false,
    successCb: () => {},
};

export default DomModal;
