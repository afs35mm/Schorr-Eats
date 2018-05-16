import React from 'react';

const StarRating = ({rating}) => {
    rating = (rating === undefined || rating === null) ? 'unrated' : rating.toString().replace('.', '-');
    return (
        <div>
            <svg className={`star-${rating}`} viewBox="0 0 180 32">
                <use xlinkHref="#icon-star" x="0" y="0" />
                <use xlinkHref="#icon-star" x="36" y="0"  />
                <use xlinkHref="#icon-star" x="72" y="0" />
                <use xlinkHref="#icon-star" x="108" y="0"  />
                <use xlinkHref="#icon-star" x="144" y="0" />
            </svg>
        </div>
    );
};

export default StarRating;