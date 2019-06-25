import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('api/users')
class Users{
  @Get()
  getAll(request: Request, response: Response){
    response.json([
      {
        fname: 'Allen',
        lname: 'Elguira',
      }
    ]);
  }

  @Get(':id')
  get(request: Request, response: Response){
    response.json(request.params.id);
  }
}

export default new Users;