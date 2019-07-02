import * as React from "react";
import Axios, { AxiosResponse } from "axios";

import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, Row, FormGroup, Container, Col, Label, 
  Input, Button, Alert, Card, CardBody
} from "reactstrap";

class PostModal extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      image: [],
      file: {},
      title: '',
      desc: '',
      alert: {
        error: '',
        success: ''
      },
      category: '',
      categories: [{}]
    };

    this.file = React.createRef();
  }

  private file: any;

  handleInput = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { files }: any = e.currentTarget;
    if(e.currentTarget.name == 'preview'){
      this.setState({
        preview: files[0],
        image: URL.createObjectURL(files[0])
      })
    } else {
      if (files.length) {
        for(let i = 0; i < files.length; i++){
          let reader = new FileReader;
          reader.readAsDataURL(files[i]);
          reader.onloadend = () => {
            this.setState({
              image: [...this.state.image, reader.result]
            })
          };
        }
        this.setState({
          file: files
        })
      }
    }
  }

  submit = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(this.state.file).map((i: any, file: any) => {
      formData.append('file', this.state.file[i]);
    });
    formData.append('categoryId', this.state.category);
    formData.append('title', this.state.title);
    formData.append('desc', this.state.desc);
    let { data }: AxiosResponse = await Axios.post('/api/portfolios/add', formData);
    if(data.success){
      this.clearInput();
    }
    this.setState({
      alert: {...this.state.alert, ...data}
    })
  }

  clearInput(){
    this.setState({ image: [], preview: '', file: '', title: '', desc: '' });
  }

  toggleNotif = (e: any) => {
    const elem: any = document.getElementById('zip-file-notice');
    elem.classList.toggle('d-none');
  }
  
  async componentDidMount(){
    let { data }: AxiosResponse = await Axios.get('/api/categories');
    this.setState({
      categories: data
    })
  }

  render(){
    // console.log(this.state.file);
    let { image, categories, alert, title, desc, category } = this.state;
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} size="lg">
        <Form onSubmit={this.submit.bind(this)}>
          <ModalHeader toggle={this.props.toggleModal}>Add new Project</ModalHeader>
          <ModalBody>
            {(alert.error) && <Alert color="danger">{alert.error}</Alert>}
            {(alert.success) && <Alert color="success">{alert.success}</Alert>}
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" onChange={this.handleInput.bind(this)} name="title" value={title}/>
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input type="textarea" id="desc" onChange={this.handleInput.bind(this)} name="desc" value={desc}/>
            </FormGroup>
            <FormGroup>
              <Label for="file">
                <span>File</span>
              </Label>
              <Input type="file" id="file" onChange={this.onFileChange} ref={this.file} name="file" multiple accept="image/*" placeholder="Submit a Portfolio file in ZIP or RAR format"/>
            </FormGroup>
            <FormGroup>
              {/* <Input type="select" name="category" onChange={this.handleInput.bind(this)} value={this.state.category}>
                <option value="" defaultValue="" hidden disabled>Category</option>
                {this.state.categories.map((category: any, i: number) =>
                  <option value={category} key={i}>{category}</option>
                )}
              </Input> */}
              <FormGroup>
                <Input type="select" className="bg-white" name="category" value={category} onChange={this.handleInput.bind(this)}>
                  <option value="" defaultValue="" hidden disabled>Choose</option>
                  {categories.length !== 0 && categories.map((category: any, i: number) => 
                    <option value={category._id} key={i}>{category.name}</option>
                  )}
                </Input>
              </FormGroup>
            </FormGroup>    
            <Row>
              {image.map((img: any, i: number) => 
                <div key={i} style={{height: 50}}>
                  <img src={img} alt="" className="img-fluid h-100"/>
                </div>  
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Submit</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}
export default PostModal;