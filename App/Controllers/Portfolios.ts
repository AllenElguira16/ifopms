import { Request, Response, request, response } from 'express';
import { Controller, Get, Delete, Post, Put, Middleware } from '@overnightjs/core';
import path from 'path';
import Portfolio from '../Models/Portfolio';
import Validator from '../Middlewares/Validator';
import fs from 'fs';
import { RequestSession, TUser } from 'interfaces/typings';
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
    let dir = path.resolve(__dirname, `../../Public/uploads/portfolios/${id}`);
    fs.readdir(dir, (err, files) => {
      response.json(files)
    });
  }

  @Get('likes/:id')
  async getData(request: Request, response: Response){
    let { id } = request.params;
    let portfolio: any = await Portfolio.findById(id).exec();
    let iLiked = portfolio.likes.map((userId) => {
      return request.session.user._id === userId;
    })
    // console.log(iLiked);
    response.json({iLiked: iLiked[0], likeCount: portfolio.likes.length});
  }

  @Get(':id')
  async get(request: Request, response: Response) {
    let { id } = request.params;
    let portfolio = await Portfolio.findById(id).populate({path: 'user'}).exec();
    response.json(portfolio);
  }

  @Post('add')
  @Middleware(Validator.isAuthUser)
  async newportfolio(request: Request, response: Response) {
    let { title, categoryId, desc }: any = request.body;
    let { file }: any = request.files;
    let session = request.session as RequestSession;
    let previewFile: string = Array.isArray(file) ? file[0].name: file.name;
    let portfolioObj = new Portfolio({ 
      user: session.user, categoryId, title, description: desc, previewFile: previewFile 
    });
    portfolioObj.save((error: any, portfolio: any) => {
      if(error) return response.json({ error: 'All fields are required' });
      file.forEach((img: any) => {
        let pathString: string =  path.join(__dirname, `../../public/uploads/portfolios/${portfolio._id}/${img.name}`);
        img.mv(pathString, (error: object) => {
          if(error) return response.json({error: 'All fields are required'});
        });
      });
      return response.json({ success: 'Portfolio successfully created' });
    });
  }

  @Put('likes')
  async portfolioLiked(request: Request, response: Response){
    let { portfolioId } = request.body;
    let { user } = request.session;
    let portfolio: any = await Portfolio.findById(portfolioId).exec();
    let iLiked = portfolio.likes.map((userId) => {
      return request.session.user._id === userId;
    })
    console.log(iLiked);
    if(iLiked.includes(true)){
      Portfolio.findByIdAndUpdate(portfolioId, {$pull: {likes: user._id}}, (error: any) => {
        if(error) return response.json({error});
        return response.json({ success: 'Updated successfully' });
      });
    } else {
      Portfolio.findByIdAndUpdate(portfolioId, {$push: {likes: user._id}}, (error: any) => {
        if(error) return response.json({error});
        return response.json({ success: 'Updated successfully' });
      });
    }
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