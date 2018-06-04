import moment from 'moment';
import React, { Component } from 'react';
import StarRating from './star-rating';
import ImagesLineup from './dom-components/images-lineup';

class RatingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        };
    }

    componentDidMount() {
        fetch('/api/restaurants')
            .then(resp => resp.json())
            .then(restaurants => this.setState({ restaurants }));
    }

    render() {
        const rows = this.state.restaurants.length
            ? this.state.restaurants.map((rest, i) => {
                  const dateReadable = rest.date ? moment(rest.date).format('MMM D YYYY') : '';
                  const ratings = rest.ratings
                      ? rest.ratings.map(rating => (
                            <tr key={rating._id}>
                                <td>{rating.author}</td>
                                <td>{rating.notes}</td>
                                <td>
                                    <StarRating rating={rating.rating} />
                                </td>
                            </tr>
                        ))
                      : null;
                  return [
                      <tr key={rest._id} className="rest-row">
                          <td>{rest.name}</td>
                          <td>{rest.location}</td>
                          <td>{rest.cuisine}</td>
                          <td>{dateReadable}</td>
                          <td className="comments-cell">
                              <table className="table-sm">
                                  <tbody>{ratings}</tbody>
                              </table>
                          </td>
                          {this.props.isLoggedIn ? (
                              <td>
                                  <button
                                      type="button"
                                      onClick={() => this.props.editRestaurant(rest._id)}
                                      className="btn btn-info btn-sm">
                                      Edit
                                  </button>
                              </td>
                          ) : null}
                      </tr>,
                      <ImagesLineup
                          key={i}
                          dirName={rest.imagesDirName}
                          images={rest.imageFileNames}
                      />,
                  ];
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
                        {this.props.isLoggedIn ? <th /> : null}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default RatingsTable;
