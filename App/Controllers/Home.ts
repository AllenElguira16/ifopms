import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';

/**
 * Home Front Controller
 * 
 * Manage's all uri inputs
 */
@Controller('*')
class Home {
  @Get('*')
  public index(req: Request, res: Response){
    res.render('index');
  }
}

export default new Home;