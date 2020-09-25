import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAdmin from '../middlewares/ensureIsAdmin';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);
productsRouter.use(ensureIsAdmin);

productsRouter.get('/', (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  const {
    name,
    sku,
    description,
    product_type_id,
    price,
    brand_id,
    attributes,
  } = request.body;

  const createProductService = new CreateProductService();

  const product = await createProductService.execute({
    name,
    sku,
    description,
    price,
    product_type_id,
    brand_id,
    attributes,
  });

  return response.json(product);
});

export default productsRouter;
