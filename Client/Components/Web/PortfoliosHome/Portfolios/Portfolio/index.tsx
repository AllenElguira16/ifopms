import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import UserPortfolios from "./UserPortfolios";
import Comment from "./Comment/Comment";
import { Link } from 'react-router-dom';
import { 
  Col, Container, Card, CardImg, CardBody, Row, CardHeader, Modal, ModalHeader, ModalBody, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import LikeNav from "./LikeNav";
import Content from './Content';

class Portfolio extends React.PureComponent<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolio: {},
      loading: true,
      commentOpen: false,
      user: {}
    }
  } 

  async fetchData(id: any){
    let res = await Axios.get(`/api/portfolios/${id}`)
    // .then(res => {
    this.setState({
      portfolio: res.data,
      loading: false
    })
    // });
  }

  toggleComment = (e: any) => {
    e.preventDefault();
    this.setState({
      commentOpen: !this.state.commentOpen
    });
  }

  async componentDidMount(){

    let res: AxiosResponse = await Axios.get('/api/auth/user')
    this.setState({
      user: res.data
    })
  }

  componentWillReceiveProps(props: any){
    let {currentId} = props;
    if(currentId !== null){
      this.fetchData(currentId);
    }
  }

  render(){
    let { portfolio, loading, user } = this.state;
    let { modal, toggleModal } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={toggleModal} size="xl">
          {!loading ? 
            <>
              <ModalHeader toggle={toggleModal}>
                <div>
                  <span>{portfolio.title}</span>
                  <UncontrolledDropdown tag={"span"}>
                    <DropdownToggle color="white" className="">
                      <i className="material-icons">edit</i>
                    </DropdownToggle>
                    <DropdownMenu left="true">
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>  
                <div className="small">
                  <span className="text-muted"> By </span><Link to={`/user/${portfolio.username}`}>{portfolio.username}</Link>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="border-bottom pb-4" style={{whiteSpace: "pre-line"}}>{portfolio.description}</div>
                <div className="wrapper position-relative overflow-hidden">
                  <Content portfolio={portfolio}/>
                </div>
                <Row>
                  <Col sm={8}>
                    {user._id !== undefined ?  
                      <>
                        <LikeNav userId={portfolio.user._id} id={portfolio.id} toggleComment={this.toggleComment} commentOpen={this.state.commentOpen}/>
                        {this.state.commentOpen && <Comment portfolioId={portfolio.id}/> }
                      </>
                    : 
                    <Link to="/login">Login first</Link>}
                  </Col>
                  <Col sm={4}>
                    <UserPortfolios portfolio={portfolio}></UserPortfolios>
                  </Col>
                </Row>
              </ModalBody>
            </>
          :
          <Container>Loading...</Container>
        }
        </Modal>
      </div>
    );
  }
}
export default Portfolio;