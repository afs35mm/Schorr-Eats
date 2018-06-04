import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

class ImagesLineup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
        };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    closeLightbox() {
        this.setState({ lightboxIsOpen: false });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    render() {
        if (!this.props.dirName || !this.props.images.length) {
            return null;
        }
        return (
            <tr>
                <td className="photos-row" colSpan="7">
                    <Lightbox
                        currentImage={this.state.currentImage}
                        images={this.props.images.map(src => ({
                            src: `/images/${this.props.dirName}/${src}`,
                        }))}
                        isOpen={this.state.lightboxIsOpen}
                        onClickNext={this.gotoNext}
                        onClickPrev={this.gotoPrevious}
                        onClose={this.closeLightbox}
                    />
                    <ul className="images-list">
                        {this.props.images.map((imgSrc, i) => (
                            <li key={i} className="item-holder">
                                <img
                                    className="item-image"
                                    src={`/images/${this.props.dirName}/${imgSrc}`}
                                    onClick={() => {
                                        this.setState({ lightboxIsOpen: true, currentImage: i });
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </td>
            </tr>
        );
    }
}

ImagesLineup.propTypes = {};

export default ImagesLineup;
