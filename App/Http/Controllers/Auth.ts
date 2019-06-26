import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Request, Response } from 'express';
import Validator from "../Middlewares/Validator";
import User from "../Models/User";
import bcrypt from 'bcrypt';

@Controller('api/auth')
class Auth{
  
  @Get('user')
  getAuthUser(request: Request, response: Response){
    const {user}: any = request.session;
    if(!user) {
      return response.json({ err: 'User is not yet authenticated' });
    }
    return response.json({ user });
  }

  @Post('login')
  userLogin(request: Request, response: Response) {
    response.json(request.body);
  }

  @Post('register')
  @Middleware([Validator.registerValidator])
  async userRegistration(request: Request, response: Response) {
    const { firstname, lastname, email, username, password, repassword, type } = request.body;
    const { file }: any = request.files;
    // Check username
    const userObj = await User.findOne({ username });
    if(userObj) return response.json({ err: 'username already exists' });
    if(password !== repassword) return response.json({ err: 'password doesn\'t match' });
    bcrypt.hash(password, 10, (err, hash) => {
    //   const user = new User({ firstname, lastname, email, username, password: hash, type });
    //   user.save((err) => {
    //     if(err) return response.json({err});
    //     return response.json({success: true});
    //   });
    });
  }

}

export default new Auth;