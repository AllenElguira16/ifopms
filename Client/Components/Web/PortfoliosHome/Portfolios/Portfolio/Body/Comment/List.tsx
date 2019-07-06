import React from "react";
import io from "socket.io-client";
import Axios, { AxiosResponse } from "axios";


class CommentList extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount(){
    this.fetchComments();
  }

  componentWillUpdate(){
    // let socket: any = io('localhost:8000');
    // socket.on('newComment', () => this.fetchComments());
  }
  // fetch comments
  async fetchComments(){
    let { portfolioId } = this.props;
    let { data }: AxiosResponse = await Axios.get(`/api/comments/${portfolioId}`)
    this.setState({comments: data});
  }

  render(){
    return (
      this.state.comments.map((comment: any, i: number)=> 
        <div key={i} className="border-bottom pt-2">
          <h6>@{comment.user.username}</h6>
          <p>{comment.content}</p>
        </div>
      )
    );
  }
}
export default CommentList;