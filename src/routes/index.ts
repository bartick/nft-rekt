import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => {
    res.send('Hello World!');
});

import actionsRouter from './actions';

router.use('/actions', actionsRouter);

export default router;