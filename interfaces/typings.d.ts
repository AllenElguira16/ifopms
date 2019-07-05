import { Document } from "mongoose";

// declare module 'Interfaces' {

// declare global{
//   namespace Express{
//     interface Request{
//       session?: MySession
//       body?: {
//         user: TUser
//       }
//     }
//   }
// }

interface RequestSession extends Express.Session{
  user?: TUser
}

type TUser = {
  _id?: string;
  firstname?: string, 
  lastname?: string, 
  username?: string,
  email?: string,
  password?: string,
  repassword?: string, 
  type?: string
}

export interface Portfolio{
  _id?: string;
  user?: TUser;
  title?: string;
  categoryId?: string,
  description?: string,
  previewFile?: string,
  likes?: number,
  views?: number,
  comments?: number,
  dateCreated?: Date,
}

export interface PortfolioHeaderProps{
  portfolio: Portfolio;
  toggleModal: any;
  user: TUser;
}

export interface PortfolioBodyProps{
  portfolio: Portfolio;
  user: TUser;  
}