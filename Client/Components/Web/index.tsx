import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Axios, { AxiosResponse } from "axios";

import Home from "./Home"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
// import PageNotFound from "./Components/PageNotFound";
import Register from "./Components/Forms/Register";
// import Login from "./Components/Forms/Login";
import Profile from "./Profile";
// import Portfolio from "./Components/Portfolio";
// import Freelancer from "./Components/Freelancer";
import Messages from "./Components/Messages";
// import EditProfile from "./Components/Profile/EditProfile";
// import SearchPage from "./Components/SearchPage";
// import Jobs from "./Components/Jobs";
import PortfoliosHome from "./PortfoliosHome";

class Web extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      user: {},
      isLoading: true
    }
  }
  
  fetchUser(){
    Axios.get("/api/auth/user").then(({data}: AxiosResponse) => {
      this.setState({
        user: data,
        isLoading: false
      });
    });
  }

  componentDidMount(){
    this.fetchUser();
  }

  render (){
    let { user } = this.state;
    return (
      <Router>
        <>
          <Header user={user} history={history}/>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/login" component={Login}></Route> */}
            <Route exact path="/register" component={Register}/>
            <Route exact path="/portfolios" render={(props) => 
              <PortfoliosHome {...props} user={user}/>
            }/>
            <Route exact path="/portfolios/:categoryId" render={(props) => 
              <PortfoliosHome {...props} user={user}/>
            }/>
            <Route exact path="/user/:username" render={(props) => 
              <Profile {...props} user={user}/>
            } />
            {/* <Route path="/freelancer/dashboard" render={(props: any) => <Freelancer {...props} user={this.state.user}/>}/> */}
            {/* <Route exact path="/edit-profile" render={(props) => 
              <EditProfile {...props} user={this.state.user}/>
            }/> */}
            {/* <Route path="/search/:search" component={SearchPage}/> */}
            {/* <Route path="/jobs" render={(props) => <Jobs {...props} user={this.state.user}/>}/> */}
            {/* <Route exact path="*" component={PageNotFound}/> */}
          </Switch>
          <Footer />
          <Messages />
        </>
      </Router>
    );
  }
}

export default Web;