import user from '@models/User';
import CreateUserRequestPayload from "@entities/createUserRequestPayload";
import { hash, compare } from 'bcrypt';
import createError from 'http-errors';
import { getErrorMessage, omitProperty } from '@utils/helpers';
import { SALT_ROUNDS } from '@utils/constants';
import SignInUserRequestPayload from '@entities/signInUserRequestPayload';
import { ObjectType } from '@utils/types';
import { getAccessToken, getRefreshToken } from '@utils/jwtHelpers';


export const createUser = async (createUserRequestPayload: CreateUserRequestPayload): Promise<void> => {
    try {
        const { name, email, password } = createUserRequestPayload;
        const passwordHash = await hash(password, SALT_ROUNDS);
        const newUser = new user({ name, email, password: passwordHash });
        await newUser.save();
    }
    catch (err) {
        const errMsg = getErrorMessage(err as Error);
        throw createError(500, errMsg)
    }
}

export const signInUser = async (signInUserRequestPayload: SignInUserRequestPayload): Promise<
    ObjectType> => {
    try {
        const { email, password: enteredPassword } = signInUserRequestPayload;
        const currentUser = await user.findOne({ email }, 'name email password').exec();
        if (!currentUser) {
            throw createError(404, 'User not found', { customError: true });
        }
        const currentUserJSON = currentUser.toJSON()
        const { password: storedPasswordInDb } = currentUserJSON;
        const match = await compare(enteredPassword, storedPasswordInDb);
        if (!match) {
            throw createError(401, 'Wrong password', { customError: true });
        }
        const [accessToken, refreshToken] = [getAccessToken({ '_id': currentUserJSON['_id'] }),
        getRefreshToken({ '_id': currentUserJSON['_id'] })]
        return {currentUser: omitProperty(currentUserJSON, ['password']),accessToken,refreshToken};
    }
    catch (err) {
        if ((err as Record<string, boolean | string | number | object>)['customError']) {
            throw err;
        }
        const errMsg = getErrorMessage(err as Error);
        throw createError(500, errMsg);
    }
}

