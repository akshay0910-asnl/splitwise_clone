import { ValidationError, validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import CreateUserRequestPayload from '@entities/createUserRequestPayload';
const validationSettings = {
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
}

const createUserMiddleware = async (_req: Request, _res: Response, _next: NextFunction) => {
    const createUserRequestBody = plainToInstance(CreateUserRequestPayload, _req.body as object);
    try {
        await validateOrReject(createUserRequestBody, validationSettings);
        _next();
    } catch (errors) {
        const message = (errors as ValidationError[]).map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
        _next(createError(400, message));
    }
}


export default createUserMiddleware;