import React from "react";
import {
  Form, FormGroup, Label, Input
} from "reactstrap";

import CommentList from "./List";
import Axios, { AxiosResponse } from "axios";
import io from 'socket.io-client';

class Comment extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      comments: [],
      comment: ''
    }
    let socket = io(':3000');
    socket.on('newComment', () => this.fetchComments());
  }

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    }) 
  }

  submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { data }: AxiosResponse = await Axios.post('/api/comments', {
      content: this.state.comment,
      portfolioId: this.props.portfolioId
    })
    if(data.success) { 
      const socket = io(':3000');
      socket.emit('newComment');
      this.setState({comment: ''});
    }
  }

  componentDidMount(){
    this.fetchComments();
  }
  // fetch comments
  async fetchComments(){
    let { portfolioId } = this.props;
    let { data }: AxiosResponse = await Axios.get(`/api/comments/${portfolioId}`)
    this.setState({ comments: data });
  }

  render() {
    let { comment, comments } = this.state;
    return (
      <div>
        <h5>Comments</h5>
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Input type="text" name="comment" autoComplete="off" value={comment} onChange={this.handleInput} placeholder="Add a comment"/>
          </FormGroup>
        </Form>
        { comments.map((commentArr: any, i: number) => 
          <CommentList key={i} comment={commentArr}/>
        ) }
      </div>
    );
  }
}
export default Comment;