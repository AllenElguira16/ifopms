import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core';
import Comment from '../Models/Comment';
import Validator from '../Middlewares/Validator';

@Controller('api/comments')
class Comments{
  @Get(':portfolioId')
  async fetchAllCommentsByPortfolioId(request: Request, response: Response) {
    let { portfolioId } = request.params;
    let commentData = await Comment.find({portfolioId}).populate('user').exec();
    response.json(commentData);
  }

  @Post()
  @Middleware(Validator.isAuthUser)
  createOne(request: Request, response: Response) {
    let { portfolioId, content } = request.body;
    let { user } = request.session
    let commentObj = new Comment({ portfolioId, user: user._id, content });
    commentObj.save((error: any, comment: any) => {
      if(error) return response.json({ error: 'Error saving to database' });
      return response.json({ success: true });
    });
  }

  @Put()
  modifyOne(request: Request, response: Response) {

  }

  @Delete(':id') 
  deleteOne(request: Request, response: Response) {

  }
}

export default new Comments;