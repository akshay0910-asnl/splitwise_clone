class HttpError extends Error {
    override message: string;
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode || 500;
    }
}

export default HttpError;