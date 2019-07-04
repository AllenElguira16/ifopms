// declare module 'Interfaces' {

declare global{
  namespace Express{
    interface Request{
      session?: {
        user: TUser
      };
      body?: {
        user: TUser
      }
    }
  }
}

export interface TUser{
  _id?: string;
  firstname?: string, 
  lastname?: string, 
  username?: string,
  email?: string,
  password: string,
  repassword?: string, 
  type?: string
}

export interface Portfolio{
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
// }