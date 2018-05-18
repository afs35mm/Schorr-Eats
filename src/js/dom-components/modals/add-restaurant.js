import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/src/stylesheets/datepicker.scss';

import StarRating from '../../star-rating';

class AddRestaurantModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // toggleModal: props.toggleModal,
            // email: '',
            // password: '',
            // error: false,
            // errorMessage: null,
            startDate: moment(),
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handlePassWordChange = this.handlePassWordChange.bind(this);
        // this.successCb = this.props.successCb.bind(this);
    }
    handleChange(date) {
        this.setState({
            startDate: date,
        });
    }

    // loginReq({ email, password }) {
    //     fetch('/users/login', {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email,
    //             password,
    //         }),
    //     })
    //         .then(resp => {
    //             if (resp.status === 200) {
    //                 return resp.json();
    //             } else if (resp.status === 401) {
    //                 return {
    //                     error: true,
    //                     errorMessage: 'Invalid username/password combination.',
    //                 };
    //             }
    //             return genericErrorMessage;
    //         })
    //         .then(data => {
    //             if (data.error) {
    //                 this.setState(data);
    //             } else {
    //                 this.successCb(data);
    //                 this.state.toggleModal(null);
    //             }
    //         })
    //         .catch(err => {
    //             this.setState(genericErrorMessage);
    //         });
    // }

    // handleEmailChange(e) {
    //     this.setState({ email: e.target.value });
    // }

    // handlePassWordChange(e) {
    //     this.setState({ password: e.target.value });
    // }

    render() {
        return (
            <div>
                <ModalHeader
                    toggle={() => {
                        this.state.toggleModal(null);
                    }}>
                    Add Restaurant
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Restaurant Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="date"
                                placeholder="Restaurant name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                aria-describedby="restaurantLocation"
                                placeholder="Restaurant location"
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cuisine">Cuisine</label>
                            <select id="cuisine" className="form-control">
                                <option defaultValue value="" />
                                <option value="African">African</option>
                                <option value="American">American</option>
                                <option value="Argentinian">Argentinian</option>
                                <option value="Asian">Asian</option>
                                <option value="Bagels">Bagels</option>
                                <option value="BBQ">BBQ</option>
                                <option value="Belgian">Belgian</option>
                                <option value="Brazilian">Brazilian</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Brunch">Brunch</option>
                                <option value="Bubble Tea">Bubble Tea</option>
                                <option value="Burgers">Burgers</option>
                                <option value="Cajun and Creole">Cajun and Creole</option>
                                <option value="Californian Cuisine">Californian Cuisine</option>
                                <option value="Cambodian">Cambodian</option>
                                <option value="Caribbean">Caribbean</option>
                                <option value="Cheesesteaks">Cheesesteaks</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Churrascaria">Churrascaria</option>
                                <option value="Costa Rican">Costa Rican</option>
                                <option value="Crepes">Crepes</option>
                                <option value="Cuban">Cuban</option>
                                <option value="Deli">Deli</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Dim Sum &amp; Dumplings">
                                    Dim Sum &amp; Dumplings
                                </option>
                                <option value="Diner">Diner</option>
                                <option value="English">English</option>
                                <option value="Farm to Table">Farm to Table</option>
                                <option value="Filipino">Filipino</option>
                                <option value="French">French</option>
                                <option value="Frozen Yogurt Dessert">Frozen Yogurt Dessert</option>
                                <option value="German">German</option>
                                <option value="Gluten-Free">Gluten-Free</option>
                                <option value="Greek">Greek</option>
                                <option value="Grocery Items">Grocery Items</option>
                                <option value="Haitian">Haitian</option>
                                <option value="Halal">Halal</option>
                                <option value="Hawaiian">Hawaiian</option>
                                <option value="Healthy">Healthy</option>
                                <option value="Hot Dogs">Hot Dogs</option>
                                <option value="Indian">Indian</option>
                                <option value="Indonesian">Indonesian</option>
                                <option value="Irish">Irish</option>
                                <option value="Italian">Italian</option>
                                <option value="Jamaican">Jamaican</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Juices">Juices</option>
                                <option value="Korean">Korean</option>
                                <option value="Kosher">Kosher</option>
                                <option value="Late-Night">Late-Night</option>
                                <option value="Latin-American">Latin-American</option>
                                <option value="Lebanese">Lebanese</option>
                                <option value="Lunch-Specials">Lunch-Specials</option>
                                <option value="Malaysian">Malaysian</option>
                                <option value="Mediterranean">Mediterranean</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Middle-Eastern">Middle-Eastern</option>
                                <option value="Moroccan">Moroccan</option>
                                <option value="Noodle-Shops">Noodle-Shops</option>
                                <option value="Organic">Organic</option>
                                <option value="Pakistani">Pakistani</option>
                                <option value="Peruvian">Peruvian</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Polish">Polish</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Russian">Russian</option>
                                <option value="Salads">Salads</option>
                                <option value="Sandwiches-Wraps">Sandwiches-Wraps</option>
                                <option value="Scandinavian">Scandinavian</option>
                                <option value="Seafood">Seafood</option>
                                <option value="Smoothies-Shakes">Smoothies-Shakes</option>
                                <option value="Soup">Soup</option>
                                <option value="Southern and Soul">Southern and Soul</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Sri-Lankan">Sri-Lankan</option>
                                <option value="Steakhouse">Steakhouse</option>
                                <option value="Sushi">Sushi</option>
                                <option value="Sweets and Candy">Sweets and Candy</option>
                                <option value="Taiwanese">Taiwanese</option>
                                <option value="Thai">Thai</option>
                                <option value="Turkish">Turkish</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Venezuelan">Venezuelan</option>
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="Wings">Wings</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="visited">Date visited</label>
                            <DatePicker
                                className="form-control"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <StarRating editable />
                        </div>
                        <div className="form-group">
                            <label htmlFor="review">Review!</label>
                            {/* <input
                                type="text"
                                className="form-control"
                                id="review"
                                aria-describedby="review"
                                placeholder="Restaurant review"
                                value={this.state.review}
                                onChange={this.handleReviewChange}
                            /> */}
                            <textarea
                                className="form-control"
                                placeholder="Restaurant review"
                                value={this.state.review}
                                onChange={this.handleReviewChange}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {}}>
                        Save
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

export default AddRestaurantModal;
