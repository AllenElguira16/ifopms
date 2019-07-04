import * as React from 'react';
import { Col, Card, CardImg, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PortfolioStatus from './portfolioStatus';

class Portfolio extends React.Component<any, any>{
  // state = {
  //   modal: false
  // }
  onClick = (id: any, e: React.MouseEvent<HTMLElement>) => {
    this.props.toggleModal(e);
    this.props.onClick(id);
  }

  render(){
    let { portfolio } = this.props;
    return (
      <Col sm={3} className="justify-content-around text-decoration-none">
        <a href="#" onClick={ (e: any) => this.onClick(portfolio._id, e) }>
          <Card title={portfolio.title} className="shadow text-decoration-none text-dark p-2" style={{zIndex: -1}}>
            <CardImg top src={`/uploads/portfolios/${portfolio._id}/${portfolio.previewFile}`} className="img-fluid" style={{ height: 200 }} />
            <CardBody className='p-0'>
              <PortfolioStatus className="d-flex px-0 py-2 justify-content-end" portfolio={portfolio} />
            </CardBody>
          </Card>
        </a>
        <div className="py-2 d-flex align-items-center">
          <img src={`/uploads/profiles/${portfolio.user._id}/${portfolio.user.profilePic}`} className="rounded-circle img-fluid" style={{ height: 30, width: 30 }} />
          <Link className="px-2" to={`/user/${portfolio.user.username}`}>@{portfolio.user.username}</Link>
        </div>
      </Col>
    );
  }
}

export default Portfolio;