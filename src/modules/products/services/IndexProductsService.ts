import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

@injectable()
class IndexProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: ['brand', 'product_type', 'productAttributeValues'],
    });

    if (!products) {
      throw new AppError('Products does not exist');
    }

    return products;
  }
}

export default IndexProductsService;
