import * as React from 'react';
import {
  Button, Form, FormGroup, Label, Input, FormText, InputGroup,
  Col, Container, Card, CardBody, CardTitle, UncontrolledAlert, Alert, Modal, ModalHeader, ModalBody, NavLink
} from 'reactstrap';
import Axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      alert: '',
      modal: false
    }
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let { username, password } = this.state;
    Axios.post("/api/auth/login", { username, password }).then(({data}: AxiosResponse) => {
      if (data.error) {
        this.setState({
          alert: data.error
        })
      } else if (data.success) {
        if(username == 'admin' && username == 'admin'){
          window.location.href = "/dashboard"
        }
        window.location.href = "/"
      }
    });
  }

  handleInput = ({currentTarget}: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      [currentTarget.name]: currentTarget.value
    })
  }
  
  toggleModal = () =>{
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    let {modal} = this.state;
    return (
      <>
        <NavLink tag={Button} onClick={this.toggleModal}>Login</NavLink>
        <Modal isOpen={modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <span>Login</span>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input onChange={this.handleInput} type="text" id="username" name="username" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Input onChange={this.handleInput} type="password" id="password" name="password" placeholder="Password" />
              </FormGroup>
              {this.state.alert.length !== 0 && <Alert color="danger">{this.state.alert}</Alert>}
              <FormGroup>
                <Button type="submit" color="primary" className="ml-auto rounded-pill">Login</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default Login;