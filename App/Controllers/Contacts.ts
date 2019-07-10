import { Controller, Get, Post, Put, Middleware } from "@overnightjs/core";
import { Request, Response } from "express";
import User from "../Models/User";
import Portfolio from "../Models/Portfolio";
import Contact from "../Models/Contact";
import Validator from "../Middlewares/Validator";

@Controller('api/contacts')
class Contacts{
  @Get()
  async getAll(request: Request, response: Response){
    let contacts = await Contact.find({});
    response.json(contacts);
  }

  @Get(':id')
  getById(request: Request, response: Response){
    response.json(request.params.id);
  }

  @Post()
  @Middleware(Validator.isAuthUser)
  get(request: Request, response: Response){
    let { id } = request.body;
    let { user } = request.body;
    let contact = new Contact({user: user._id, friend: id});
    contact.save((error: any) => {
      if(error) return response.json(error);
      return response.json({success: true});
    });
  }
}

export default new Contacts;