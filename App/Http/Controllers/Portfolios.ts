import { Request, Response, request, response } from 'express';
import { Controller, Get, Delete, Post, Put, Middleware } from '@overnightjs/core';
import path from 'path';
import Portfolio from '../Models/Portfolio';
import Validator from '../Middlewares/Validator';

@Controller('api/portfolios')
class Portfolios{
  @Get()
  async getAll(request: Request, response: Response) {
    let categories = await Portfolio.find({});
    response.json(categories);
  }

  @Get(':id')
  async get(request: Request, response: Response) {
    let { id } = request.params;
    let portfolio = await Portfolio.findById({_id: id});
    response.json(portfolio);
  }

  @Post('add')
  // @Middleware(Validator.isAuthUser)
  async newportfolio(request: Request, response: Response) {
    let { title, categoryId, desc }: any = request.body;
    // let { file }: any = request.files;
    console.log(request.body);
    // let portfolioObj = new Portfolio({ title, category, desc });
    // portfolioObj.save((error: any, portfolio: any) => {
    //   if(error) return response.json({ error });
      // file.forEach((img: any) => {
      //   let pathString: string =  path.join(__dirname, `../public/uploads/portfolios/${portfolio._id}`);
      //   img.mv(pathString, (error: object) => {
      //     if(error) return response.json({error});
      //     // return response.json({success: true});
      //   });
      // });
      // file.mv()
    // });
  }

  @Put(':id')
  async updateportfolio(request: Request, response: Response) {
    let portfolioData = request.body;
    let { id } = request.params;
    Portfolio.findByIdAndUpdate(id, portfolioData, (error: any, categories: any) => {
      if(error) return response.json({error});
      return response.json({success: true});
    });
  }

  @Delete(':id')
  async delete(request: Request, response: Response) {
    let { id } = request.params;
    Portfolio.findByIdAndRemove(id, (error: any) => {
      if(error) return response.json({error: error});
      return response.json({success: true});
    });
  }
}

export default new Portfolios;