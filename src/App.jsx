import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main.jsx';
import Title from './components/Title/Title.jsx';
import Header from './components/Header/Header.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import ErrorHandler from './components/ErrorHandler.jsx';
import NotFound from './components/NotFound.jsx';
import Categories from './components/Categories.jsx';
import NotesList from './components/NotesList.jsx';
import './css/App.css';

const App = () => (
  <div className="App  container-fluid">
    <ErrorHandler>
    <Route component={Header}/>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/search" component={SearchForm} />
      <Route path="/title/:id/" component={Title} />
      <Route path="/categories" component={Categories} />
      <Route path="/notes" component={NotesList} />
      <Route component={NotFound} />
    </Switch>
    </ErrorHandler>
  </div>
);

export default App;
