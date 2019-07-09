import React from 'react';
import {
  Col
} from "reactstrap";
import Axios, { AxiosResponse } from 'axios';
import io from "socket.io-client";
class LikeNav extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      likeCount: null,
      iLiked: false,
      user: {}
    }
    let socket: any = io(':3000');
    socket.on('updateLike', () => {
      this.fetchLikes();
    });
  }

  async likePortfolio(e: any) {
    e.preventDefault();
    let { data }: AxiosResponse = await Axios.put(`/api/portfolios/likes`, {portfolioId: this.props.id});
    if(data.success) {
      let socket = io(':3000');
      socket.emit('updateLike');
    }
  }
  
  async fetchLikes(){
    let { data } = await Axios.get(`/api/portfolios/likes/${this.props.id}`);
    // console.log(data);
    this.setState({...data});
  }
  
  componentDidMount(){
    // this.fetchUser();
    this.fetchLikes();
  }

  render(){
    return (
      <div>
        <div className="border-bottom py-2">
          {this.state.likeCount !== null && <span>{this.state.likeCount} likes</span>}
        </div>
        <div className="border-bottom py-2 d-flex react">
          <Col tag="a" href="#" sm={6} onClick={this.likePortfolio.bind(this)}
            className={(this.state.iLiked ? 'liked ' : '') + `justify-content-center d-flex align-items-center`}
          >
            <i className="material-icons">thumb_up</i>
            <span className="p-2">Like</span>
          </Col>
          <Col tag="a" href="#" sm={6}
            onClick={this.props.toggleComment.bind(this)}
            className={(this.props.commentOpen ? 'comment-open ' : '') + `justify-content-center d-flex align-items-center`}
          >
            <i className="material-icons">comment</i>
            <span className="p-2">Comment</span>
          </Col>
        </div>
      </div>
    );
  }
}
export default LikeNav;