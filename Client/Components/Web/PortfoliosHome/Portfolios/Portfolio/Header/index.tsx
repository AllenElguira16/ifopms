import React from 'react';
import { ModalHeader, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PortfolioHeaderProps } from 'interfaces/typings';

class Header extends React.Component<PortfolioHeaderProps, any>{
  
  render() {
    let { portfolio, toggleModal, user } = this.props;
    return (
      <ModalHeader toggle={toggleModal}>
        <div>
          <span>{portfolio.title}</span>
          { portfolio.user._id === user._id && 
            <UncontrolledDropdown tag={"span"}>
              <DropdownToggle color="white" className="">
                <i className="material-icons">edit</i>
              </DropdownToggle>
              <DropdownMenu left="true">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          }
        </div>  
        <div className="small">
          <span className="text-muted"> By </span>
          <Link to={`/user/${portfolio.user.username}`}>{portfolio.user.username}</Link>
        </div>
      </ModalHeader>
    );
  }
}

export default Header;