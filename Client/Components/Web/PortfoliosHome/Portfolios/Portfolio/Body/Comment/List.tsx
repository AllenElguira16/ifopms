import React from "react";
import io from "socket.io-client";
import Axios, { AxiosResponse } from "axios";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Input, Form } from "reactstrap";


class CommentList extends React.PureComponent<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      isEdit: false,
      commentInput: ''
    }
  }

  handleInput = (e: any) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }

  submit = async (e: React.FormEvent<HTMLFormElement>, commentId: string) => {
    e.preventDefault();
    let { data }: AxiosResponse = await Axios.put('/api/comments', {
      content: this.state.commentInput, commentId
    })
    if(data.success) { 
      this.setState({isEdit: false});
      const socket = io(':3000');
      socket.emit('newComment');
    }
  }

  delete = async (id: string) => {
    let { data }: AxiosResponse = await Axios.delete(`/api/comments/${id}`);
    if(data.success) { 
      const socket = io(':3000');
      socket.emit('newComment');
    }
  }

  render(){
    let { isEdit, commentInput } = this.state;
    let { comment } = this.props;
    return (
      <div className="position-relative">
        {!isEdit && 
          <div className="border-bottom pt-2">
            <h6>@{comment.user.username}</h6>
            <p>{comment.content}</p>
          </div>
        }
        {isEdit && 
          <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.submit(e, comment._id)}>
            <FormGroup>
              <Input type="text" name="commentInput" autoComplete="off" value={commentInput} onChange={this.handleInput} placeholder="Add a comment"/>
            </FormGroup>
          </Form>
        }
        <UncontrolledDropdown className="position-absolute" style={{right: 20, top: 20}}>
          <DropdownToggle caret/>
          <DropdownMenu>
            <DropdownItem header>Options</DropdownItem>
            <DropdownItem onClick={() => this.setState({isEdit: true, commentInput: comment.content})}>Edit</DropdownItem>
            <DropdownItem onClick={() => this.delete(comment._id)}>Delete</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}
export default CommentList;