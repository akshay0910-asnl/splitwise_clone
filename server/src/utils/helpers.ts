/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Error as MongooseError } from "mongoose";
import { MongoError } from 'mongodb';

export const getErrorMessage = (err: Error) => {

    if(err instanceof MongooseError.ValidationError){
        const message = Object.values(err.errors).map((err) => err.message).join(", ");
        return message;
    }
    else if(err instanceof MongoError){
        switch(err.code){
            case 11000:{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const {keyValue } = err as any;
                const keyValuePair = keyValue as Record<string, unknown>;
                return Object.entries(keyValuePair).reduce((acc:string[], entry) => {
                    const [key,value] = entry;
                    if(typeof key === 'string' && typeof value === 'string'){
                        return [...acc, `Duplicate ${key} : ${value} `];
                    }
                    return [...acc];
                },[]).join(', ');
                break;
            }
            default:{
                return err.message;
            }
        }
    }
    return err.message;
}