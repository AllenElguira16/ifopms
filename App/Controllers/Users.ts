import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import User from "../Models/User";

@Controller('api/users')
class Users{
  @Get()
  async getAll(request: Request, response: Response){
    let users = await User.find({});
    response.json(users);
  }

  @Get(':id')
  get(request: Request, response: Response){
    response.json(request.params.id);
  }
}

export default new Users;