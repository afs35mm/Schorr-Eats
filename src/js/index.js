import 'bootstrap';

import '../styles/index.scss';

fetch('/api/restaurants').then(resp => resp.json()).then((data) => {
    console.log(data);
});
console.log('!fss');

import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));