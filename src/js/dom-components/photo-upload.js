import React, { Component } from 'react';

class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
        };
    }

    handleChange(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            const readerP = new Promise((resolve, reject) => {
                reader.onload = resolve;
                reader.onerror = reject;
            })
                .then(e => {
                    const img = new Image();
                    const imgP = new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                    img.src = e.target.result;
                    return imgP;
                })
                .then(a => {
                    console.log(a);
                });
            reader.readAsDataURL(file);
        });
    }

    render() {
        // const imgs = this.state.photos.map((photo) => {
        //     const reader = new FileReader();
        // })
        return (
            <div>
                <input
                    name="uploads[]"
                    onChange={this.handleChange.bind(this)}
                    type="file"
                    multiple
                />
            </div>
        );
    }
}

export default PhotoUpload;
