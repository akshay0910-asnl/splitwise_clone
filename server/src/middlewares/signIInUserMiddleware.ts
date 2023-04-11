import { ValidationError, validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { validationSettings } from '@utils/constants';
import SignInUserRequestPayload from '@entities/signInUserRequestPayload';

const signInUserMiddleware = async (_req: Request, _res: Response, _next: NextFunction) => {
    const signInUserRequestBody = plainToInstance(SignInUserRequestPayload, _req.body as object);
    try {
        await validateOrReject(signInUserRequestBody, validationSettings);
        _next();
    } catch (errors) {
        const message = (errors as ValidationError[]).map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
        _next(createError(400, message));
    }
}

export default signInUserMiddleware;