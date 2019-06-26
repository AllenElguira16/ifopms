import express from 'express';
import expressValidator from 'express-validator';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import path from 'path';
import { Server as OvernightServer } from '@overnightjs/core';
import Home from './Http/Controllers/Home';
import Users from './Http/Controllers/Users';
import mongoose from 'mongoose';
import Auth from './Http/Controllers/Auth';

class Server extends OvernightServer{
  constructor() {
    super();

    // this.app.use();
    this.app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false
      }
    }));
    this.app.use(fileUpload());
    this.app.use(expressValidator());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../', '/public')));
    

    /**
     * Changing default Settings
     */
    this.app.set('views', path.join(__dirname, '../', 'client/views'));
    this.app.set('view engine', "ejs");
    this.app.set('json spaces', 2);

    super.addControllers([Users, Auth, Home]);
  }

  public start(port: number) {
    mongoose.connect('mongodb+srv://user:user@clustersofstars-renyu.mongodb.net/ifopms?retryWrites=true&w=majority', {
      useNewUrlParser: true
    }).then(() => console.log('MongoDB Connected Successfully')).catch((err) => console.error(err));
    this.app.listen(port, () => console.log('Server started on port ' + port));
  }
}

export default new Server();