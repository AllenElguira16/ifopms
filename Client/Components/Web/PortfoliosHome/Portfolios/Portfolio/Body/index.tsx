import React from 'react';
import { ModalBody, Row, Col } from 'reactstrap';
import Content from './Content';
import LikeNav from './LikeNav';
import { Link } from 'react-router-dom';
import UserPortfolios from './UserPortfolios';
import Comment from './Comment';
import { PortfolioBodyProps } from 'interfaces/typings';

class Body extends React.Component<PortfolioBodyProps, any>{
  constructor(props: any) {
    super(props as any);
    this.state = {
      commentOpen: false,
    }
  }

  toggleComment = (e: any) => {
    e.preventDefault();
    this.setState({
      commentOpen: !this.state.commentOpen
    });
  }

  render() {
    let { commentOpen } = this.state;
    let { portfolio, user } = this.props;
    return (
      <ModalBody>
        <div className="border-bottom pb-4" style={{whiteSpace: "pre-line"}}>{portfolio.description}</div>
        <div className="wrapper position-relative overflow-hidden">
          <Content portfolio={portfolio}/>
        </div>
        <Row>
          <Col sm={8}>
            {user._id !== undefined ?  
              <>
                <LikeNav userId={portfolio.user._id} id={portfolio._id} toggleComment={this.toggleComment} commentOpen={commentOpen}/>
                {commentOpen && <Comment portfolioId={portfolio._id}/> }
              </>
            : 
            <Link to="/login">Login first</Link>}
          </Col>
          <Col sm={4}>
            <UserPortfolios portfolio={portfolio}></UserPortfolios>
          </Col>
        </Row>
      </ModalBody>
    )
  }
}

export default Body;