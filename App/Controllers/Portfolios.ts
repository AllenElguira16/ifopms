import { Request, Response, request, response } from 'express';
import { Controller, Get, Delete, Post, Put, Middleware } from '@overnightjs/core';
import path from 'path';
import Portfolio from '../Models/Portfolio';
import Validator from '../Middlewares/Validator';
import fs from 'fs';
// import path fr;

@Controller('api/portfolios')
class Portfolios{
  @Get()
  async getAll(request: Request, response: Response) {
    let data = await Portfolio.find().populate({path: 'user'}).exec();
    response.json(data);
  }

  @Post('images')
  getImages(request: Request, response: Response) {
    let { id } = request.body;
    let dir = path.resolve(__dirname, `../Public/uploads/portfolios/${id}`);
    fs.readdir(dir, (err, files) => {
      response.json(files)
    });
  }

  @Get(':id')
  async get(request: Request, response: Response) {
    let { id } = request.params;
    let portfolio = await Portfolio.findById({_id: id}).populate({path: 'user'}).exec();
    response.json(portfolio);
  }

  @Post('add')
  @Middleware(Validator.isAuthUser)
  async newportfolio(request: Request, response: Response) {
    let { title, categoryId, desc }: any = request.body;
    let { file }: any = request.files;
    let { user } = request.session;
    let portfolioObj = new Portfolio({ 
      user: user._id, categoryId, title, description: desc, previewFile: file[0].name 
    });
    portfolioObj.save((error: any, portfolio: any) => {
      if(error) return response.json({ error: 'All fields are required' });
      file.forEach((img: any) => {
        let pathString: string =  path.join(__dirname, `../public/uploads/portfolios/${portfolio._id}/${img.name}`);
        img.mv(pathString, (error: object) => {
          if(error) return response.json({error: 'All fields are required'});
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