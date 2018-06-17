import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

const initialState = {
  mainDisplayMode: '?sort=popularityRank',
  animeList: null,
  searchValue: ''
}

function appManager(state = initialState,action) {
  switch (action.type) {
    case 'FETCH_API_SUCCESS': {
      return {
        ...state,
        animeList: action.payload
      }
    };
    case 'SEARCH_INPUT_CHANGE': {
      return {
        ...state,
        searchValue: action.payload
      }
    };
    case 'SELECT_DISPLAY_MODE': {
      let query = '';
      switch (action.payload) {
        case 'top-airing': {query = '?filter[status]=current&sort=popularityRank'; break};
        case 'top-rated': {query = '?sort=ratingRank'; break};
        case 'top-popular' : {query = '?sort=popularityRank'; break};
        default: {query = '?sort=+popularityRank'}
      }
      return {
        ...state,
        animeList: null,
        mainDisplayMode: query
      }
    }
    default: return state;
  }
}

const store = createStore(appManager, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
