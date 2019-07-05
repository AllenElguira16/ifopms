import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Request, Response } from 'express';
import path from 'path';
import Validator from "../Middlewares/Validator";
import User from "../Models/User";
import bcrypt from 'bcryptjs';
import { RequestSession, TUser } from "interfaces/typings";
// import { TUser } from "interfaces/typings";

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
    const { username, password }: TUser = request.body;
    let userData: any = await User.findOne({ username });
    if(!userData) return response.json({ error: "Username doesn't exists!" });
    let match = await bcrypt.compare(password, userData.password);
    if(!match) return response.json({ error: "Password doesn't match" });
    request.session.user = userData;
    return response.json({success: true});
  }

  @Post('register')
  @Middleware([Validator.registerValidator])
  async userRegistration(request: Request, response: Response) {
    const { firstname, lastname, email, username, password, repassword, type }: TUser = request.body;
    const { file }: any = request.files;
    let { user } = request.session as RequestSession;
    // Check username
    const userObj = await User.findOne({ username });
    if(userObj) return response.json({ error: 'username already exists' });
    if(password !== repassword) return response.json({ error: 'password doesn\'t match' });
    bcrypt.hash(password, 10, (err, hash) => {
      const userModel = new User({ firstname, lastname, email, username, password: hash, type, profilePic: file.name });
      userModel.save((err, newUser) => {
        if(err) return response.json({err: 'Error creating user'});
        if(!user) {
          user = newUser;
        }
        file.mv(path.join(__dirname, `../public/uploads/profiles/${newUser._id}/${file.name}`), (errMsg: object) => {
          if(errMsg) return response.json({error: 'Error uploading file'});
          return response.json({success: true});
        });
      });
    });
  }
}

export default new Auth;