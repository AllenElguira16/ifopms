import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Request, Response } from 'express';
import path, { resolve } from 'path';
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
      // response.json(hash);
      const user = new User({ firstname, lastname, email, username, password: hash, type, profilePic: file.name });
      user.save((err, newUser) => {
        if(err) return response.json({err});
        this.upload(file, newUser._id);
        request.session.user = newUser;
        return response.json({success: true});
      });
      return response.json({success: true});
    });
  }

  upload(img: any, id: String) {
    const imgName: String = img.name;
    img.mv(path.join(__dirname, `../public/uploads/${id}/${imgName}`), (err) => {
      if(err) {
        return new Promise((resolve) => {
          resolve(err);
        });
      }
    });
  }
}

export default new Auth;