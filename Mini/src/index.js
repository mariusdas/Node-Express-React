import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import GiftsPage from './components/GiftsPage.js';
import GiftsFavouritePage from './components/GiftsFavouritePage';
import App from './App';

import './index.css';
const RouterMapping = () => (
  <Router>
  <div>
    <Route exact path='/' component={App} />
    <Route path='/Gifts' component={GiftsPage} />
	<Route path='/GiftsFavourite' component={GiftsFavouritePage} />
  </div>
  </Router>
);
ReactDOM.render( 
  <RouterMapping />,
  document.getElementById('root')
);
