
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err:HttpError, _req:Request, res:Response, _next:NextFunction) => {
    res.status(err.statusCode || 500).send({message:err.message});
}

export default errorHandler;