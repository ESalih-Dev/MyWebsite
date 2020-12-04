import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

import './App.scss';

class App extends Component {
  render() {
    const App = () => (
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    );
    return (
        <Switch>
            <App />
        </Switch>
    );
  }
}

export default App;
