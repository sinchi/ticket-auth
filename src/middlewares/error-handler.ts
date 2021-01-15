import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong ...');

    res.send({
        message: 'Something went wrong'
    })
    
}  