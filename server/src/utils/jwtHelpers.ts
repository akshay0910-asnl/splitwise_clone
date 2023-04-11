import { ObjectType } from "./types";
import { JwtPayload, sign, verify } from 'jsonwebtoken';

export const getSecretForAccessToken = ():string => {
    const stringForAccessTokenGeneration = process.env["ACCESS_SECRET_KEY_STRING"] || 'access';
    return getBase6StringFromInitialString(stringForAccessTokenGeneration);
}

export const getSecretForRefreshToken = ():string => {
    const stringForRefreshTokenStringGeneration = process.env["REFRESH_SECRET_KEY_STRING"] || 'refresh';
    return getBase6StringFromInitialString(stringForRefreshTokenStringGeneration);
}

export const getAccessToken = (payload:ObjectType):string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //Token expires in 60 mins
    return sign(payload,getSecretForAccessToken(),{algorithm:'HS256',expiresIn: 60 * 60 * 1000}) ;
}

export const getRefreshToken = (payload:ObjectType):string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //Token expires in 7 days
    return sign(payload,getSecretForRefreshToken(),{algorithm:'HS256',expiresIn: '7d'}) ;
}

export const verifyAccessToken = (accessToken:string): string | JwtPayload => {
    return verify(accessToken,getSecretForAccessToken(),{algorithms:['HS256']})
}

export const verifyRefreshToken = (refreshToken:string): string | JwtPayload => {
    return verify(refreshToken,getSecretForRefreshToken(),{algorithms:['HS256']})
}

const getBase6StringFromInitialString = (str: string): string => Buffer.from(str).toString('base64')