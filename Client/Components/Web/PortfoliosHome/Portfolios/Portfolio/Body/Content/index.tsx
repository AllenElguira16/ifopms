import * as React from 'react';
import {
  Container, Card, Col
} from 'reactstrap';
import Axios from 'axios';

class Content extends React.Component<any, any>{
  state: any = {
    images: []
  }
  componentDidMount(){
    let { portfolio } = this.props;
    Axios.post(`/api/portfolios/images`, { id: portfolio._id }).then((res: any) => {
      this.setState({
        images: res.data
      })
    });
  }
  render(){
    let { images } = this.state;
    let { portfolio } = this.props;
    return(
      <Container>
        <div className="row justify-content-between">
          {images.length && images.map((image: any, i: number) => 
            <Col sm={3} key={i} style={{height: 200}}>
              <img className="h-100" src={`/uploads/portfolios/${portfolio._id}/${image}`} alt=""/>
            </Col>
          )}
        </div>
      </Container>
    );
  }
}
export default Content;