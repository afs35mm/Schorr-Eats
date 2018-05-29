import React, { Component } from 'react';

class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
        };
    }

    handleChange(e) {
        const files = Array.from(e.target.files);
        const pFiles = files.map(file => {
            const reader = new FileReader();
            const readerP = new Promise((resolve, reject) => {
                reader.onloadend = resolve;
            });
            reader.readAsDataURL(file);
            return readerP.then(e => {
                const img = new Image();
                new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
                img.src = e.target.result;
                return img;
            });
        });
        Promise.all(pFiles).then(imgs => {
            this.setState({ imgs });
        });
    }

    render() {
        return (
            <div className="photo-uploader">
                <div className="custom-file">
                    <input
                        name="uploads[]"
                        onChange={this.handleChange.bind(this)}
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                    </label>
                </div>
                <ul className="images-list">
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/350x150" />
                    </li>
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/150x350" />
                    </li>
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/400x400" />
                    </li>
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/10x20" />
                    </li>
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/30x10" />
                    </li>
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/350x150" />
                    </li>
                    <li className="item-holder">
                        <img className="item-image" src="http://via.placeholder.com/350x150" />
                    </li>
                </ul>
            </div>
        );
    }
}

export default PhotoUpload;
