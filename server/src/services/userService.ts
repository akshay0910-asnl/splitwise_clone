import user from '@models/User';
import CreateUserRequestPayload from "@entities/createUserRequestPayload";
import {Document} from 'mongoose';
import createError from 'http-errors';
import { getErrorMessage } from '@utils/helpers';

export const createUser = async(createUserRequestPayload:CreateUserRequestPayload):Promise<Document> => {
    try{
        const { name, email, password} = createUserRequestPayload;
        const newUser = new user({name, email, password});
        const savedUser = await newUser.save();
        return savedUser;
    }
    catch(err){
        const errMsg = getErrorMessage(err as Error);
         throw createError(500,errMsg)
    }
}