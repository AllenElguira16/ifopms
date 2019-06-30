import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from "./Home";
import Login from "./Login";

class Dashboard extends React.Component<any, State>{
  constructor(props: any){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  
  render() {
    let { isLoggedIn } = this.state
    return (
      <Router>
        <>
          { isLoggedIn ? 
            <Switch>
              <Route path="/dashboard" component={Home}/>
            </Switch>
          : 
            <Switch>
              <Route path="/dashboard" component={(props: any) => 
                <Login {...props} setAsLoggedIn={this.setAsLoggedIn}/>
              }/>
            </Switch>
          }
        </>
      </Router>
    )
  }
  
  private setAsLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    });
  }
}

interface State {
  isLoggedIn: boolean
}

export default Dashboard;