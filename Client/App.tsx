import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web from './Components/Web';
import Dashboard from './Components/Dashboard';

class App extends React.Component<any, any>{
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={ Dashboard }/>
          <Route path="/" component={ Web }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;