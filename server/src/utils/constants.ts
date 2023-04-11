export const SALT_ROUNDS = (process.env['SALT_ROUNDS'] && +(process.env['SALT_ROUNDS'])) ?
    +(process.env['SALT_ROUNDS']) : 10;

export const validationSettings = {
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
}