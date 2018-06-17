import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './components/Main.js';
import Title from './components/Title.js';
import SearchInput from './components/SearchInput.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchInput/>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/title/:id/' component={Title}/>
        </Switch>
      </div>
    );
  }
}

export default App;
