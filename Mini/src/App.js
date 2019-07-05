import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppCss from './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
			<div className="topnav" id="myTopnav">
			  <Link to="/Gifts">Gifts</Link>&nbsp;
			  <Link to="/GiftsFavourite">Gifts Favourite</Link>
			</div>
        </div>
      </div>
    );
  }
}

export default App;
