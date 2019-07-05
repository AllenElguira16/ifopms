import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import UserPortfolios from "./Body/UserPortfolios";
import Comment from "./Body/Comment";
import { Link } from 'react-router-dom';
import { 
  Col, Container, Card, CardImg, CardBody, Row, CardHeader, Modal, ModalHeader, ModalBody, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import LikeNav from "./Body/LikeNav";
import Content from './Body/Content';
import Header from './Header';
import Body from './Body';

class Portfolio extends React.PureComponent<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolio: {},
      loading: true,
      user: {}
    }
  } 

  async fetchData(id: any){
    let res = await Axios.get(`/api/portfolios/${id}`)
    this.setState({
      portfolio: res.data,
      loading: false
    })
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
              <Header portfolio={portfolio} toggleModal={toggleModal} user={user}/>
              <Body user={user} portfolio={portfolio}/>
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