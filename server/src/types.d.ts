import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload{
    _id:string,
    index:number,
    username:string,
    email:string
}

export interface Users extends CustomJwtPayload{
    refreshToken?:string,
    verified:boolean,
    notificationAdjust:string,
    password?:string,
    contributions:number
}

declare global {
  namespace Express {
    interface Request {
      user: CustomJwtPayload | JwtPayload;
    }
  }
}