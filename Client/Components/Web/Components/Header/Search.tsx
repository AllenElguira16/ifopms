import React from 'react';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import Button from 'reactstrap/lib/Button';
import { Link } from 'react-router-dom';
import InputGroup from 'reactstrap/lib/InputGroup';
import Input from 'reactstrap/lib/Input';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Axios from 'axios';

class Search extends React.Component<any, any>{
  constructor(props: any){
    super(props);

    this.state = {
      input: '',
      results: {
        projects: [],
        users: []
      }
    }
  }
  captureEnterKey = (e: React.KeyboardEvent) => {
    if(e.key == 'Enter'){
      let {input} = this.state;
      window.location.href = `/search/${input}`;
    }
  }

  input = (e: React.FormEvent<HTMLInputElement>): void => {
    // console.log(e.);
    this.setState({
      input: e.currentTarget.value
    })
    if(e.currentTarget.value !== ''){
      Axios.get(`/api/search/${e.currentTarget.value}`).then(res => {
        this.setState({results: res.data});
      });
    } else {
      this.setState({
        results: {
          projects: [],
          users: []
        }
      });
    }
  }

  render() {
    let { users, projects } = this.state.results;
    let { input } = this.state;
    return (
      <Nav navbar className="mx-auto">
        {location.pathname !== '/' && 
          <>
            <NavItem>
              <Button tag={Link} to="/jobs" className="mr-4 btn-raised nav-link">
                <span className="mt-1">Jobs</span>
              </Button>
            </NavItem>
            <NavItem className="position-relative">
              <InputGroup>
                <Input style={{width: 300}} type="text" onKeyPress={this.captureEnterKey} onChange={this.input} value={input} placeholder="Search project"/>
              </InputGroup>
              {this.state.input !== '' && 
                <Card className="position-absolute w-100" style={{top: 40, zIndex: 1}}>
                  <CardBody>
                    <CardTitle>Projects</CardTitle>
                    {projects.length ? 
                      projects.map((project: any, i: number) => 
                        <div key={i}>
                          <Link to={`/portfolio/${project.id}`}>{project.title}</Link>
                        </div>
                      ) : (
                        <div>No results</div>
                      )
                    }
                    <CardTitle>Users</CardTitle>
                    {users.length ? 
                      users.map((user: any, i: number) => 
                      <div key={i}>
                          <Link to={`/user/${user.username}`}>{user.firstname} {user.lastname}</Link>
                        </div>
                      ) : (
                        <div>No results</div>
                      )
                    }
                  </CardBody>
                </Card>
              }
            </NavItem>
          </>
        }
      </Nav>
    );
  }
}

export default Search;