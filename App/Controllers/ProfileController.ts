import { Controller, Get, Middleware } from "@overnightjs/core";
import { Request, Response } from "express";
import User from "../Models/User";
import Validator from "../Middlewares/Validator";

@Controller('api/users')
class Profile{
  @Get()
  @Middleware(Validator.isAuthUser)
  async getAll(request: Request, response: Response){
    let users = await User.find({});
    response.json(users);
  }

  @Get(':id')
  get(request: Request, response: Response){
    response.json(request.params.id);
  }
}

export default new Profile;