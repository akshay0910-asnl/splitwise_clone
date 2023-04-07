import CreateUserRequestPayload from '@entities/createUserRequestPayload';
import { NextFunction, Request, Response } from 'express';
import { createUser as createUserService } from '@services/userService';


export const createUser = async(_req: Request, _res: Response,_next:NextFunction): Promise<void> => {
	
    try{
        const createUserRequestPayload = _req.body as CreateUserRequestPayload;
        const savedUser = await createUserService(createUserRequestPayload);
        _res.status(200).json({...savedUser});
    }
    catch(err){
        _next(err);
    }
    
}


