import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import User from "../Models/User";
import Portfolio from "../Models/Portfolio";

@Controller('api/users')
class Users{
  @Get()
  async getAll(request: Request, response: Response){
    let users = await User.find({});
    response.json(users);
  }

  @Get(':username')
  async getPortfoliosOfUser(request: Request, response: Response){
    let { username } = request.params;
    let user = await User.findOne({username});
    // response.json(user);
    let portfolios = await Portfolio.find({user: user._id}).exec();
    let isSameUser: Boolean = false;
    if(request.session.user) {
      isSameUser = user._id === request.session.user._id;
    }
    response.json({user, portfolios, isSameUser: isSameUser});
  }

  @Get(':id')
  get(request: Request, response: Response){
    response.json(request.params.id);
  }
}

export default new Users;