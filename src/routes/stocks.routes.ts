import { Router } from 'express';
import { getRepository } from 'typeorm';

import Stock from '../models/Stock';
import AddProductToStockService from '../services/AddProductToStockService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAdmin from '../middlewares/ensureIsAdmin';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);
productsRouter.use(ensureIsAdmin);

productsRouter.get('/', async (request, response) => {
  const stocksRepository = getRepository(Stock);
  const stocks = await stocksRepository.find();

  return response.json(stocks);
});

productsRouter.get('/:id/products', async (request, response) => {
  const { id } = request.params;

  const stocksRepository = getRepository(Stock);
  const stockWithProducts = await stocksRepository.findOne(id, {
    relations: ['productToStocks'],
  });

  return response.json(stockWithProducts);
});

productsRouter.post('/:id/products', async (request, response) => {
  const { productIds } = request.body;
  const { id } = request.params;

  const createProductService = new AddProductToStockService();

  const stock = await createProductService.execute({
    productIds,
    stockId: id,
  });

  return response.json(stock);
});

export default productsRouter;
