import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './components/Main.js';
import Title from './components/Title.js';
import Header from './components/Header.js';
import SearchForm from './components/SearchForm.js';
import ErrorHandler from './components/ErrorHandler.js';
import NotFound from './components/NotFound.js';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App  container-fluid">
        <ErrorHandler>
        <Route component={Header}/>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/search' component={SearchForm}/>
          <Route path='/title/:id/' component={Title}/>
          <Route path='*' component={NotFound}/>
        </Switch>
        </ErrorHandler>
      </div>
    );
  }
}

export default App;
