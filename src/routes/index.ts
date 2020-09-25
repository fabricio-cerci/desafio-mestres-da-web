import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import stocksRouter from './stocks.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/stocks', stocksRouter);

export default routes;
