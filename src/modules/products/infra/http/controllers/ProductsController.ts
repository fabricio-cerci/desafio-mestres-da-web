import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexProductsService from '@modules/products/services/IndexProductsService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexProductsService = container.resolve(IndexProductsService);

    const products = await indexProductsService.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      sku,
      description,
      product_type_id,
      price,
      brand_id,
      attributes,
    } = request.body;

    const createProductService = container.resolve(CreateProductService);

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
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const product = request.body;
    const { id } = request.params;

    const updateProductService = container.resolve(UpdateProductService);

    const updatedProduct = await updateProductService.execute({
      productId: id,
      ...product,
    });

    return response.json(updatedProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({
      productId: id,
    });

    return response.json();
  }
}
