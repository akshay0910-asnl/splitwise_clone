import CreateUserRequestPayload from '@entities/createUserRequestPayload';
import { NextFunction, Request, Response } from 'express';
import { createUser as createUserService, signInUser as signInUserService } from '@services/userService';
import SignInUserRequestPayload from '@entities/signInUserRequestPayload';


export const createUser = async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
    try {
        const createUserRequestPayload = _req.body as CreateUserRequestPayload;
        await createUserService(createUserRequestPayload);
        _res.status(200).json({ message: 'User created successfully' }).end();
    }
    catch (err) {
        _next(err);
    }
}

export const signInUser = async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
    try {
        const signInUserRequestPayload = _req.body as SignInUserRequestPayload;
        const {currentUser,accessToken,refreshToken} = await signInUserService(signInUserRequestPayload);
        _res.cookie('a','b',{sameSite:'lax'});
        _res.cookie('accessToken',accessToken,{httpOnly:false, maxAge: 60*60*1000,sameSite:'none'});
        _res.cookie('refreshToken',refreshToken,{httpOnly:true, maxAge: 60*60*1000*24*7,sameSite:'none'});
        _res.status(200).json(currentUser).end();
    }
    catch (err) {
        _next(err);
    }
}


