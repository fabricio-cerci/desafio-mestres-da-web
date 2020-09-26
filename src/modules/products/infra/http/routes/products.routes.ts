import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '@modules/products/repositories/ProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@modules/users/infra/http/middlewares/ensureIsAdmin';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);
productsRouter.use(ensureIsAdmin);

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.find({
    relations: ['brand', 'product_type', 'productAttributeValues'],
  });

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

productsRouter.put('/:id', async (request, response) => {
  const product = request.body;
  const { id } = request.params;

  const updateProductService = new UpdateProductService();

  const updatedProduct = await updateProductService.execute({
    productId: id,
    ...product,
  });

  return response.json(updatedProduct);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProductService = new DeleteProductService();

  await deleteProductService.execute({
    productId: id,
  });

  return response.json();
});

export default productsRouter;