import express, { Application } from 'express';
import expressValidator from 'express-validator';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import path from 'path';
import { Server as OvernightServer } from '@overnightjs/core';
import mongoose from 'mongoose';
import Controllers from './Controllers';

class Server extends OvernightServer{
  constructor() {
    super();

    this.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false
      }
    }));
    this.use(fileUpload({
      createParentPath: true
    }));
    this.use(expressValidator());
    this.use(express.urlencoded({ extended: false }));
    this.use(express.json());
    this.use(express.static(path.join(__dirname, '../', '/public')));
    

    /**
     * Changing default Settings
     */
    this.set('views', path.join(__dirname, '../', 'client/views'));
    this.set('view engine', "ejs");
    this.set('json spaces', 2);

    super.addControllers(Controllers);
  }

  public use(params: any) {
    this.app.use(params);
  }

  public set(params: any, value: any) {
    this.app.set(params, value);
  }

  public start(port: number) {
    mongoose.connect('mongodb+srv://user:user@clustersofstars-renyu.mongodb.net/ifopms?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false
    }).then(() => console.log('MongoDB Connected Successfully')).catch((err) => console.error(err));
    this.app.listen(port, () => console.log('Server started on port ' + port));
  }

  public getInstance() {
    return this;
  }
}

export default new Server();