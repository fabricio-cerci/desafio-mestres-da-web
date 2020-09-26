import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@modules/users/infra/http/middlewares/ensureIsAdmin';
import StocksController from '../controllers/StocksController';
import StockProductsControllers from '../controllers/StockProductsController';

const stocksRouter = Router();
const stocksController = new StocksController();
const stockProductsControllers = new StockProductsControllers();

stocksRouter.use(ensureAuthenticated);
stocksRouter.use(ensureIsAdmin);

stocksRouter.get('/', stocksController.index);

stocksRouter.get('/:id/products', stockProductsControllers.show);

stocksRouter.post('/:id/products', stockProductsControllers.create);

export default stocksRouter;
