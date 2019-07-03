import { Request, Response, request, response } from 'express';
import { Controller, Get, Delete, Post, Put, Middleware } from '@overnightjs/core';
import path from 'path';
import Portfolio from '../Models/Portfolio';
import Validator from '../Middlewares/Validator';
import User from '../Models/User';

@Controller('api/portfolios')
class Portfolios{
  private data: Array<any> = [];
  @Get()
  async getAll(request: Request, response: Response) {
    let categories: any = await Portfolio.find({}).populate('User').exec((error, data) => {
      response.json(categories);
    });

    // categories.forEach(async (category: any) => {
    //   let user = await User.findById(category.userId);
    //   this.data.push(category);
    // });
  }

  @Get(':id')
  async get(request: Request, response: Response) {
    let { id } = request.params;
    let portfolio = await Portfolio.findById({_id: id});
    response.json(portfolio);
  }

  @Post('add')
  @Middleware(Validator.isAuthUser)
  async newportfolio(request: Request, response: Response) {
    let { title, categoryId, desc }: any = request.body;
    let { file }: any = request.files;
    let portfolioObj = new Portfolio({ userId: request.session.user._id, categoryId, title, description: desc, previewFile: file[0].name });
    portfolioObj.save((error: any, portfolio: any) => {
      if(error) return response.json({ error });
      file.forEach((img: any) => {
        let pathString: string =  path.join(__dirname, `../public/uploads/portfolios/${portfolio._id}/${img.name}`);
        img.mv(pathString, (error: object) => {
          if(error) return response.json({error});
        });
      });
      return response.json({ success: 'Portfolio successfully created' });
    });
  }

  @Put(':id')
  async updateportfolio(request: Request, response: Response) {
    let portfolioData = request.body;
    let { id } = request.params;
    Portfolio.findByIdAndUpdate(id, portfolioData, (error: any, categories: any) => {
      if(error) return response.json({error});
      return response.json({ success: 'Updated successfully' });
    });
  }

  @Delete(':id')
  async delete(request: Request, response: Response) {
    let { id } = request.params;
    Portfolio.findByIdAndRemove(id, (error: any) => {
      if(error) return response.json({error: error});
      return response.json({ success: 'Deleted successfully' });
    });
  }
}

export default new Portfolios;