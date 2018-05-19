import React, { Component } from 'react';

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO there has to be a better way to do this
            rating: props.rating,
            editable: props.editable,
            hoverRating: null,
            onClickCb: props.onClickCb,
        };
    }
    onMouseLeave() {
        this.setState({ hoverRating: null });
    }

    onStarClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.right - rect.left;
        const percentageLeft = (e.nativeEvent.clientX - rect.left) / width;
        this.setState(() => {
            const newState = {
                rating: this.roundPercentage(percentageLeft),
            };
            if (this.state.onClickCb) {
                this.state.onClickCb(newState.rating);
            }
            return newState;
        });
    }

    getCoordinates(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.right - rect.left;
        const percentageLeft = (e.nativeEvent.clientX - rect.left) / width;
        this.setState({ hoverRating: this.roundPercentage(percentageLeft) });
    }

    roundPercentage(n) {
        if (n < 0.1) {
            return 0.5;
        } else if (n >= 0.1 && n < 0.2) {
            return 1;
        } else if (n >= 0.2 && n < 0.3) {
            return 1.5;
        } else if (n >= 0.3 && n < 0.4) {
            return 2;
        } else if (n >= 0.4 && n < 0.5) {
            return 2.5;
        } else if (n >= 0.5 && n < 0.6) {
            return 3;
        } else if (n >= 0.6 && n < 0.7) {
            return 3.5;
        } else if (n >= 0.7 && n < 0.8) {
            return 4;
        } else if (n >= 0.8 && n < 0.9) {
            return 4.5;
        } else if (n >= 0.9) {
            return 5;
        }
    }

    render() {
        let rating;
        // if (this.state.editable) {

        // } else
        if (this.state.hoverRating) {
            rating = this.state.hoverRating.toString().replace('.', '-');
        } else {
            rating =
                this.state.rating === undefined || this.state.rating === null
                    ? 'unrated'
                    : this.state.rating.toString().replace('.', '-');
        }

        return (
            <div>
                <svg
                    onMouseMove={this.state.editable ? this.getCoordinates.bind(this) : null}
                    onClick={this.state.editable ? this.onStarClick.bind(this) : null}
                    onMouseLeave={this.state.editable ? this.onMouseLeave.bind(this) : null}
                    className={`star-container rating-${rating}`}
                    viewBox="0 0 180 32">
                    <use xlinkHref="#icon-star" x="0" y="0" />
                    <use xlinkHref="#icon-star" x="36" y="0" />
                    <use xlinkHref="#icon-star" x="72" y="0" />
                    <use xlinkHref="#icon-star" x="108" y="0" />
                    <use xlinkHref="#icon-star" x="144" y="0" />
                </svg>
            </div>
        );
    }
}

export default StarRating;
