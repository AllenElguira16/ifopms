import React from 'react';
import Login from '../Forms/Login';
import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Message from '../Message';
import Notifications from '../Notifications';

class UserNavItem extends React.Component<any, any>{
  render() {
    let { user } = this.props;
    console.log(user);

    return (
      <>
        {user.error ? 
          <Nav navbar>
            <NavItem>
              <Login />
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/register">Register</NavLink>
            </NavItem>
          </Nav>
            :
          <Nav navbar>
            <Link to="/portfolios" className="p-2">
              <i className="material-icons  mt-1">home</i>
            </Link>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <i className="material-icons  mt-1">message</i>
              </DropdownToggle>
              <DropdownMenu right style={{ zIndex: 10}}>
                <Message user={user}/>
              </DropdownMenu>
            </UncontrolledDropdown> */ }
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <i className="material-icons  mt-1">notifications</i>
              </DropdownToggle>
              <DropdownMenu right>
                {/* <Notifications user={user}></Notifications> */}
                <DropdownItem>HAHA</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <img src={`/uploads/profiles/${user._id}/${user.file}`} className="rounded-circle img-fluid" style={{height: 30, width: 30}}/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to={`/user/${user.username}`}>Profile</DropdownItem>
                <DropdownItem tag={Link} to="/edit-profile">Edit Profile</DropdownItem>
                <DropdownItem tag="a" href="/api/logout">Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>}
      </>
    );
  }
}

export default UserNavItem;