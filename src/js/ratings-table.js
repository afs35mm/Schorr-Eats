import React, { Component } from 'react';
import StarRating from './star-rating';

class RatingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            restaurants: [],
            editRestaurant: props.editRestaurant,
        };
    }

    componentWillMount() {
        fetch('/api/restaurants')
            .then(resp => resp.json())
            .then(restaurants => this.setState({ restaurants }));
    }

    render() {
        const rows = this.state.restaurants.length
            ? this.state.restaurants.map(rest => {
                  const ratings = rest.ratings.map(rating => (
                      <tr key={rating._id}>
                          <td>{rating.author}</td>
                          <td>{rating.notes}</td>
                          <td>
                              <StarRating rating={rating.rating} />
                          </td>
                          {this.state.isLoggedIn ? (
                              <td>
                                  <button
                                      type="button"
                                      onClick={() => this.state.editRestaurant(rest._id)}
                                      className="btn btn-info btn-sm">
                                      Edit
                                  </button>
                              </td>
                          ) : null}
                      </tr>
                  ));
                  return (
                      <tr key={rest._id} className="rest-row">
                          <td>{rest.name}</td>
                          <td>{rest.location}</td>
                          <td>{rest.cuisine}</td>
                          <td>{rest.dateReadable}</td>
                          <td className="comments-cell">
                              <table className="table-sm">
                                  <tbody>{ratings}</tbody>
                              </table>
                          </td>
                      </tr>
                  );
              })
            : null;
        return (
            <table className="table table-sm main-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Cuisine</th>
                        <th>Visited</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default RatingsTable;
