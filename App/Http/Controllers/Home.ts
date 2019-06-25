import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('*')
class Home {
    @Get('*')
    public index(req: Request, res: Response){
        res.send('Hello');
    }
}

export default Home;