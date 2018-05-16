import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import LoginModal from './modals/login';

const DomModal = ({ modalType, showModal, toggleModal }) => {
    let modalContent;
    if (modalType === 'login') {
        modalContent = <LoginModal toggleModal={toggleModal} />;
    } else {
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
};

DomModal.defaultProps = {
    modalType: '',
    showModal: false,
};

export default DomModal;
