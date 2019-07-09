import * as React from "react";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";

import {
  Row
} from "reactstrap";

class UserPortfolios extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolios: []
    };
  }

  async fetchData(portfolio: any){
    let { data }: AxiosResponse = await Axios.get(`/api/users/${portfolio.user.username}`)
    let { portfolios } = data;
    portfolios.map((portfolioObj: any, i: number) => {
      if(portfolioObj._id === portfolio._id) portfolios.splice(i, 1);
    });
    this.setState({portfolios});
  }

  componentWillReceiveProps(props: any){
    let portfolio = this.props.portfolio;
    if(portfolio.id !== props.portfolio.id){
      this.fetchData(props.portfolio);
    }
  }

  componentDidMount(){
    this.fetchData(this.props.portfolio)
  }

  render(){
    let { portfolio } = this.props;
    let { portfolios } = this.state;
    return (
      portfolios.length !== 0 &&
      <aside>
        <header>More from <Link to={`/user/${portfolio.username}`}>{portfolio.username}</Link></header>
        <Row>
        {portfolios.map((portfolios: any) =>
          <div key={portfolios._id} className="col-sm-6">
            {/* <Link to={`/portfolio/${portfolios.id}`}> */}
            <img src={`/uploads/portfolios/${portfolios._id}/${portfolios.previewFile}`} alt="" className="img-fluid"/>
            {/* </Link> */}
          </div>
        )}
        </Row>
      </aside>
    );
  }
}
export default UserPortfolios;