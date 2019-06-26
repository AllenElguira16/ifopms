import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from 'express';

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
  userRegistration(request: Request, response: Response) {
    const { firstname, lastname, email, username, password, repassword, type } = request.body;
    const { file }: any = request.files;
    // response.json({body: request.body, files: request.files});
  }
}

export default new Auth;