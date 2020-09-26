import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  productId: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ productId }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
