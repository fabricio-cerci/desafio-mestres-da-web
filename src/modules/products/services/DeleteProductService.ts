import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  productId: string;
}

class DeleteProductService {
  public async execute({ productId }: Request): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(productId);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
