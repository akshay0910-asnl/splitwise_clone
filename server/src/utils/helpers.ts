

import { Error as MongooseError } from "mongoose";
import { MongoError } from 'mongodb';
import { ObjectType } from "./types";

export const getErrorMessage = (err: Error): string => {

    if (err instanceof MongooseError.ValidationError) {
        const message = Object.values(err.errors).map((err) => err.message).join(", ");
        return message;
    }
    else if (err instanceof MongoError) {
        switch (err.code) {
            case 11000: {
                const { keyValue } = err as unknown as ObjectType;
                const keyValuePair = keyValue as ObjectType;
                return Object.entries(keyValuePair).reduce((acc: string[], entry) => {
                    const [key, value] = entry;
                    if (typeof key === 'string' && typeof value === 'string') {
                        return [...acc, `Duplicate ${key} : ${value} `];
                    }
                    return [...acc];
                }, []).join(', ');
                break;
            }
            default: {
                return err.message;
            }
        }
    }
    return err.message;
}

export const omitProperty = (obj: Record<string, boolean | string | number | object>, omittedKeys: string[]):
    ObjectType => {
    const omittedKeysLowerCase = omittedKeys.map(key => key.toLowerCase());

    return Object.entries(obj).reduce((acc: ObjectType, entry) => {
        const [key, value] = entry;
        return omittedKeysLowerCase.indexOf(key) > -1 ? { ...acc } : { ...acc, [key]: value }
    }, {})

}

