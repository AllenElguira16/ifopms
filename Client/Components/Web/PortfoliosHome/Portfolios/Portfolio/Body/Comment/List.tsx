import React from "react";
import io from "socket.io-client";
import Axios, { AxiosResponse } from "axios";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


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
    let socket: any = io(':3000');
    socket.on('newComment', () => this.fetchComments());
  }
  // fetch comments
  async fetchComments(){
    let { portfolioId } = this.props;
    let { data }: AxiosResponse = await Axios.get(`/api/comments/${portfolioId}`)
    this.setState({ comments: data });
  }

  render(){
    let { comments } = this.state;
    return (
      comments.length && comments.map((comment: any, i: number) => 
        <React.Fragment key={i}>
          <div className="border-bottom pt-2">
            <h6>@{comment.user.username}</h6>
            <p>{comment.content}</p>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle caret/>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </React.Fragment>
      )
    );
  }
}
export default CommentList;