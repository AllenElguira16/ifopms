// import {  } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { RequestValidation } from 'express-validator';

class Validator{
  registerValidator(request: Request & RequestValidation, response: Response, next: NextFunction) {
    request.checkBody('firstname').notEmpty().isString();
    request.checkBody('lastname').notEmpty().isString();
    request.checkBody('email').notEmpty().isString();
    request.checkBody('username').notEmpty().isString();
    request.checkBody('password').notEmpty().isString();
    request.checkBody('repassword').notEmpty().isString();
    request.checkBody('type').notEmpty().isString();

    const requestErrors = request.validationErrors();
    if(requestErrors) {
      return response.json({err: "All Fields are Required"});
    }
    return next();
  }
}

export default new Validator;