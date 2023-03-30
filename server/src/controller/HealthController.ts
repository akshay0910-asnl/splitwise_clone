import { Request, Response } from 'express'

export const showHealth = (_req: Request, _res: Response) => {
	_res.status(200).json({ message: 'All good' })
}


