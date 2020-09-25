import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';

import AppError from '../errors/AppError';

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
