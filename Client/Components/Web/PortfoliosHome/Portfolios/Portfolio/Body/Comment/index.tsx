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
      comment: ''
    }
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
  render() {
    let { comment } = this.props;
    return (
      <div>
        <h5>Comments</h5>
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Input type="text" name="comment" autoComplete="off" value={comment} onChange={this.handleInput} placeholder="Add a comment"/>
            <CommentList portfolioId={this.props.portfolioId}></CommentList>
          </FormGroup>
        </Form>        
      </div>
    );
  }
}
export default Comment;