import { Router } from 'express';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@modules/users/infra/http/middlewares/ensureIsAdmin';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);
productsRouter.use(ensureIsAdmin);

productsRouter.get('/', productsController.index);

productsRouter.post('/', productsController.create);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
