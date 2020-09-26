import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import IStocksRepository from '../repositories/IStocksRepository';
import IProductToStockRepository from '../repositories/IProductToStockRepository';

import Stock from '../infra/typeorm/entities/Stock';

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

  public async execute({ productIds, stockId }: IRequest): Promise<Stock> {
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

    await this.productToStockRepository.save(productsToStock);

    const updatedStock = await this.stocksRepository.findById(stockId);

    if (!updatedStock) {
      throw new AppError('Stock does not exist');
    }

    return updatedStock;
  }
}

export default AddProductToStockService;
