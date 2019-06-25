import express from 'express';
import expressValidator from 'express-validator';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import web from './Route/web';
import api from './Route/api';
import path from 'path';
// // App instance
// const app: express.Application = express();

// /**
//  * Injecting Dependencies
//  * 
//  * Adding packages as Dependencies for application services
//  */
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     secure: false
//   }
// }));
// app.use(fileUpload());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../', '/public')));
// // app.use(expressValidator());
// // app.use('/api', api);
// // app.use('/', web);

// /**
//  * Changing default Settings
//  */
// app.set('views', path.join(__dirname, '../', 'client/views'));
// app.set('view engine', "ejs");
// app.set('json spaces', 2);

// export default app;
// // import {  } from '@tsed/common';
import { Server as OvernightServer } from '@overnightjs/core';
import Home from './Http/Controllers/Home';

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
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../', '/public')));
    
    super.addControllers([new Home()]);
  }

  public start(port: number) {
    this.app.listen(port, () => console.log('Server started on port ' + port));
  }
}

export default Server;