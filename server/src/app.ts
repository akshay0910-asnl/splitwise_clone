
import environment from '@config/index';
import express, { Request, Response, NextFunction, Application } from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';
import connectMongo from '@connections/mongo';
import healthRouter from '@routes/healthRoute';
import v1Router from '@routes/v1Route';
import errorHandler from '@middlewares/errorHandler';


const app: Application = express()
const PORT = process.env['PORT'] || 8000;

console.log(`Environment:${environment}`);

connectMongo().catch(err =>{
	console.error(err);
	process.exit(1);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors({
	origin: function (origin, callback) {
	  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	  if (["http://127.0.0.1:5500"].indexOf(origin as string) !== -1) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		callback(null, true)
	  } else {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		callback(new Error('Not allowed by CORS'))
	  }
	},
	credentials: true,
	
  }))

//routes
app.use('/health', healthRouter);
app.use('/v1', v1Router);

app.use('*', (_req: Request, _res: Response, _next: NextFunction) => {
	_next(createError(404, `Route Not Found`));
});

///global error handler
app.use(errorHandler);

app.listen(PORT, () =>{ console.log(`Server Running on PORT ${PORT}`)})
