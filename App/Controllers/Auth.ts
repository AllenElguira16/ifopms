import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Request, Response } from 'express';
import path from 'path';
import Validator from "../Middlewares/Validator";
import User from "../Models/User";
import bcrypt from 'bcryptjs';
import { TUser } from "interfaces/typings";

@Controller('api/auth')
class Auth{
  
  @Get('user')
  @Middleware(Validator.isAuthUser)
  getAuthUser(request: Request, response: Response){
    const {user}: any = request.session;
    if(!user) {
      return response.json({ error: 'User is not yet authenticated' });
    }
    return response.json({ ...user });
  }

  @Post('login')
  async userLogin(request: Request, response: Response) {
    const { username, password } = request.body;
    let user: any = await User.findOne({ username });
    if(!user) return response.json({ error: "Username doesn't exists!" });
    let match = await bcrypt.compare(password, user.password);
    if(!match) return response.json({ error: "Password doesn't match" });
    request.session.user = user;
    return response.json({success: true});
  }

  @Post('register')
  @Middleware([Validator.registerValidator])
  async userRegistration(request: Request, response: Response) {
    const { firstname, lastname, email, username, password, repassword, type }: TUser = request.body;
    const { file }: any = request.files;
    // Check username
    const userObj = await User.findOne({ username });
    if(userObj) return response.json({ error: 'username already exists' });
    if(password !== repassword) return response.json({ error: 'password doesn\'t match' });
    bcrypt.hash(password, 10, (err, hash) => {
      const user = new User({ firstname, lastname, email, username, password: hash, type, profilePic: file.name });
      user.save((err, newUser) => {
        if(err) return response.json({err: 'Error creating user'});
        request.session.user = newUser;
        file.mv(path.join(__dirname, `../public/uploads/profiles/${newUser._id}/${file.name}`), (errMsg: object) => {
          if(errMsg) return response.json({error: 'Error uploading file'});
          return response.json({success: true});
        });
      });
    });
  }
}

export default new Auth;