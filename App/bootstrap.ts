// import express from 'express';
// import expressValidator from 'express-validator';
// import session from 'express-session';
// import fileUpload from 'express-fileupload';
// import web from './Route/web';
// import api from './Route/api';
// import path from 'path';
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
// app.use('/api', api);
// app.use('/', web);

// /**
//  * Changing default Settings
//  */
// app.set('views', path.join(__dirname, '../', 'resources/views'));
// app.set('view engine', "ejs");
// app.set('json spaces', 2);

// export default app;
import {  } from '@tsed/common';