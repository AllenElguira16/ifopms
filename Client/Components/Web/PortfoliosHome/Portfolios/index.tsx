import React from "react";
import Axios, { AxiosResponse } from "axios";
import {
  Row, Card, CardImg, CardBody, CardText, CardTitle, Button, 
  Form, FormGroup, Input, Col
} from "reactstrap";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import PortfolioCard from './PortfolioCard';
import Portfolio from "./Portfolio";


class Portfolios extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolios: [],
      isCommentBoxOpen: false,
      modal: false,
      currentId: null
    }
  }

  async fetchPortfolio(sort: any){
    let { categoryId } = this.props.match.params;
    if(categoryId !== null) {
      let { data }: AxiosResponse = await Axios.get('/api/portfolios');
      this.setState({
        portfolios: data
      });
    }
  }

  componentDidMount(){
    this.fetchPortfolio('dateCreated');
  }

  componentDidUpdate(){
    // let socket = io('https://www.ifopms.dev:8000');
    // socket.on('loadPortfolio', (type: any) => {
    //   this.fetchPortfolio(type);
    // });
  }

  toggleModal = (e: any): void => {
    e.preventDefault();
    let {modal} = this.state;
    this.setState({
      modal: !modal
    })
  }

  setCurrentId = (id: number): void => {
    this.setState({
      currentId: id
    })
  }

  render(){
    let { portfolios, modal, currentId } = this.state;
    return (
      <>
        <Row className="justify-content-between mt-4"> 
          { portfolios.length && portfolios.map((portfolio: any, i: number) => 
            <PortfolioCard key={i} portfolio={portfolio} toggleModal={this.toggleModal} onClick={this.setCurrentId}/>
          ) }
        </Row>
        <Portfolio toggleModal={this.toggleModal} modal={modal} currentId={currentId}/>
      </>
    );
  }
}
export default Portfolios;