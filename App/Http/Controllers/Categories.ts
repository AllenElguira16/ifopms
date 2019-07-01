import { Request, Response, request, response } from 'express';
import { Controller, Get, Delete, Post, Put } from '@overnightjs/core';
import Category from '../Models/Category';

@Controller('api/categories')
class Categories{
  @Get()
  async getAll(request: Request, response: Response) {
    let categories = await Category.find({});
    response.json(categories);
  }

  @Get(':id')
  async get(request: Request, response: Response) {
    let { id } = request.params;
    let category = await Category.findById({_id: id});
    response.json(category);
  }

  @Post('add')
  async newCategory(request: Request, response: Response) {
    let { name } = request.body;
    let categoryObj = new Category({name});
    categoryObj.save((error: any, categories: any) => {
      if(error) return response.json({error});
      return response.json({success: true, categories});
    });
  }

  @Put(':id')
  async updateCategory(request: Request, response: Response) {
    let categoryData = request.body;
    let { id } = request.params;
    Category.findByIdAndUpdate(id, categoryData, (error: any, categories: any) => {
      if(error) return response.json({error});
      return response.json({success: true, categories});
    });
  }

  @Delete(':id')
  async delete(request: Request, response: Response) {
    let { id } = request.params;
    Category.findByIdAndRemove(id, (error: any, newCategories: any) => {
      if(error) return response.json({error: error});
      return response.json({success: true, categories: newCategories});
    });
  }
}

export default new Categories;