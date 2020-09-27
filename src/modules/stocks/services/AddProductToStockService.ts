import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import ProductToStock from '@modules/products/infra/typeorm/entities/ProductToStock';
import IStocksRepository from '../repositories/IStocksRepository';
import IProductToStockRepository from '../repositories/IProductToStockRepository';

import IAddProductToStockDTO from '../dtos/IAddProductToStockDTO';

interface IRequest {
  productIds: string[];
  stockId: string;
}

@injectable()
class AddProductToStockService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
    @inject('ProductToStockRepository')
    private productToStockRepository: IProductToStockRepository,
  ) {}

  public async execute({
    productIds,
    stockId,
  }: IRequest): Promise<(IAddProductToStockDTO & ProductToStock)[]> {
    const stock = await this.stocksRepository.findById(stockId);

    if (!stock) {
      throw new AppError('Stock does not exist');
    }

    const productIdsPromise = productIds.map(async productId => {
      const productExist = await this.productsRepository.findById(productId);

      if (!productExist) {
        throw new AppError('Product does not exist');
      }

      return { productId, stockId };
    });

    const productsToStock = await Promise.all(productIdsPromise);

    const productToStock = await this.productToStockRepository.save(
      productsToStock,
    );

    return productToStock;
  }
}

export default AddProductToStockService;
