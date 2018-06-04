import moment from 'moment';
import React, { Component } from 'react';
import StarRating from './star-rating';
import ImagesLineup from './dom-components/images-lineup';

class RatingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            sortedDateAscending: null,
            sortedNameAscending: null,
        };
        this.sortByDate = this.sortByDate.bind(this);
        this.sortByName = this.sortByName.bind(this);
    }

    componentDidMount() {
        fetch('/api/restaurants')
            .then(resp => resp.json())
            .then(restaurants => this.setState({ restaurants }));
    }

    sortByName(e) {
        e.preventDefault();
        let { restaurants } = this.state;
        restaurants = restaurants.sort((a, b) => {
            if (this.state.sortedNameAscending) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
        });
        this.setState({ restaurants, sortedNameAscending: !this.state.sortedNameAscending });
    }

    sortByDate(e) {
        e.preventDefault();
        let { restaurants } = this.state;
        restaurants = restaurants.sort((a, b) => {
            if (this.state.sortedDateAscending) {
                return new Date(a.date) - new Date(b.date);
            }
            return new Date(b.date) - new Date(a.date);
        });
        this.setState({ restaurants, sortedDateAscending: !this.state.sortedDateAscending });
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
                          <td>
                              <strong>{rest.name}</strong>
                          </td>
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
                        <th>
                            <a href="#" onClick={this.sortByName}>
                                Name
                            </a>
                        </th>
                        <th>Location</th>
                        <th>Cuisine</th>
                        <th>
                            <a href="#" onClick={this.sortByDate}>
                                Visited
                            </a>
                        </th>
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
