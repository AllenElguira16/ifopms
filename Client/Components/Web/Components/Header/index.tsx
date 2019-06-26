import React from "react";
import {
  Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, NavLink,
  UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
  Input, InputGroup, Button, Card, CardBody, CardTitle
} from "reactstrap";

import { Link } from "react-router-dom";
import Axios from "axios";
import Search from './Search';
import UserNavItem from "./UserNavItem";

class Header extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      portfolios: [],
      isOpen: false,
      modal: false,
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  scrollTop(elem: HTMLElement){
    let height: number = elem.scrollHeight;
    window.addEventListener('scroll', () => {
      if (height < window.scrollY) elem.classList.add('fixed-top');
      else elem.classList.remove('fixed-top');
    });
  }

  componentDidMount(){
    // HTMLElement 
    // this.scrollTop(document.querySelector("#header"));
    // Axios.post('/api/portfolio', {sort: 'dateCreated'}).then((res: any) => {
    //   this.setState({
    //     portfolios: res.data
    //   });
    // });
  }

  clearInput(e: any){
    this.setState({
      input: ''
    });
  }

  // toggleModal
  toggleModal() {
    this.setState((prevState: any) => ({
      modal: !prevState.modal
    }));
  }

  render() {
    // let { users, projects } = this.state.results;
    let { user } = this.props;
    // console.log(this.props.user);
    return (
      <header style={{height: "auto"}}>
        <Navbar id="header" expand="sm" color="white">
          <NavbarBrand tag={Link} to="/portfolios"><img src="/images/logo.png" alt="" width="100"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar className="justify-content-end">
            <Search/>
            <UserNavItem user={user}/>
          </Collapse>        
        </Navbar>
        <Navbar style={{zIndex: 0}}>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink tag={Link} to="/jobs">See all Jobs</NavLink>
            </NavItem>
            <NavItem>|</NavItem>
            <NavItem>
              <NavLink tag={Link} to="/portfolios">See all Categories</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    )
  }
}
export default Header