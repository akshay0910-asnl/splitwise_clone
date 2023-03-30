const environment = process.env['NODE_ENV'] || 'development'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({
	path: path.resolve(
		process.cwd(),
		'src',
		'environments',
		`.${environment}.env`
	),
})

export default environment;
