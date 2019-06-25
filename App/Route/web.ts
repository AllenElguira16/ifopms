import { Router, Request, Response } from 'express';
const Route = Router();

Route.get('/*', (req: Request, res: Response) => {
  res.render('index');
});

export default Route;
