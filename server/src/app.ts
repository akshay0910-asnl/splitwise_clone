
import environment from '@config/index';
import express, { Request, Response, NextFunction, Application } from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import connectMongo from '@connections/mongo';
import healthRouter from '@routes/HealthRoute';
import errorHandler from '@middlewares/errorHandler';


const app: Application = express()
const PORT = process.env['PORT'] || 8000;

console.log(`Environment:${environment}`);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
connectMongo();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//routes
app.use('/health', healthRouter)
app.use('*', (_req: Request, _res: Response, _next: NextFunction) => {
	_next(createError(404, `Route Not Found`));
});

///global error handler
app.use(errorHandler);

app.listen(PORT, () =>{ console.log(`Server Running on PORT ${PORT}`)})
