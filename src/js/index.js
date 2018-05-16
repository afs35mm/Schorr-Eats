import React from 'react';
import ReactDOM from 'react-dom';
import RatingsTable from './ratings-table';
import NavBar from './dom-components/nav-bar';
import Modal from './dom-components/modal';
import { Button } from 'reactstrap';

import 'bootstrap';
import '../styles/index.scss';

class SchorrEats extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        return <div>
            <Modal shouldShow={this.state.modal} toggleModal={this.toggle} />
            <NavBar showModal={this.toggle} />
            <div className="container-fluid">
                <RatingsTable />
            </div>
        </div>
    }
};

ReactDOM.render(<SchorrEats />, document.getElementById("index"));
