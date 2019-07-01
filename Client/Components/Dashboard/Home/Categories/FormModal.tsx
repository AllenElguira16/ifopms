import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, Input, Form } from 'reactstrap';
import Axios, { AxiosResponse } from 'axios';

class FormModal extends React.Component<any, any>{
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      categoryName: ''
    };
  }

  ModalToggler = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }

  // onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   let { categoryName } = this.state;
  //   let { data }: AxiosResponse = await Axios.post('/api/categories/add', {name: categoryName});
  //   if(data.error) return;
  //   if(data.success) this.props.onSuccess();
  // }
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({categoryName: ''});
    this.props.onSubmit(e, this.state);
  }

  render() {
    let { isOpen, categoryName } = this.state;
    return (
      <>
        <Button onClick={this.ModalToggler}>{this.props.children}</Button>
        <Modal isOpen={isOpen} toggle={this.ModalToggler}>
          <ModalHeader toggle={this.ModalToggler}>Modal</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Input type="text" name="categoryName" onChange={this.onInputChange} value={categoryName} placeholder="Category Name"/>
              <Button type="submit">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default FormModal;