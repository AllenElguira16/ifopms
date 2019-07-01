import React from 'react';
import Axios, { AxiosResponse } from 'axios';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import Button from 'reactstrap/lib/Button';

class Categories extends React.Component<any, any>{
  constructor(props: any){
    super(props);

    this.state = {
      categories: []
    }  
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    let response: AxiosResponse = await Axios.get('/api/categories');
    this.setState({categories: response.data});
  }

  deleteCategories = async (categoryId: string) => {
    // e.preventDefault();
    let { data }: AxiosResponse = await Axios.delete(`/api/categories/${categoryId}`);
    if(data.error) return;
    if(data.success) this.fetchCategories();
  }

  updateCategories = async (e: React.FormEvent<HTMLFormElement>, params: any, categoryId: string) => {
    e.preventDefault();
    let { categoryName } = params;
    let { data }: AxiosResponse = await Axios.put(`/api/categories/${categoryId}`, {name: categoryName});
    if(data.error) return;
    if(data.success) this.fetchCategories();
  }

  addCategories = async (e: any, params: any) => {
    e.preventDefault();
    let { categoryName } = params;
    let { data }: AxiosResponse = await Axios.post('/api/categories/add', {name: categoryName});
    if(data.error) return;
    if(data.success) this.fetchCategories();
  }

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  render() {
    let { categories } = this.state;
    return (
      <>
        <Table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Added</th>
            </tr>
            {categories.length !== 0 && categories.map((category: any, i: number) => 
              <tr key={i}>
                <td>{++i}</td>
                <td>{category.name}</td>
                <td>{this.formatDate(category.dateCreated)}</td>
                <td>
                  <FormModal onSubmit={(e: any, params: any) => this.updateCategories(e, params, category._id)}>Edit</FormModal>
                  <Button onClick={() => this.deleteCategories(category._id)}>Delete</Button>
                </td>
              </tr>      
            )}
          </tbody>
        </Table>
        <FormModal onSubmit={this.addCategories}>Add</FormModal>
      </>
    );
  }
}

export default Categories;