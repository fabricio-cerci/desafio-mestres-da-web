import { getRepository, getCustomRepository } from 'typeorm';

import Stock from '../models/Stock';
import ProductToStock from '../models/ProductToStock';
import ProductsRepository from '../repositories/ProductsRepository';

import AppError from '../errors/AppError';

interface Request {
  productIds: string[];
  stockId: string;
}

class AddProductToStockService {
  public async execute({ productIds, stockId }: Request): Promise<Stock> {
    const stocksRepository = getRepository(Stock);
    const productsToStockRepository = getRepository(ProductToStock);
    const productsRepository = getCustomRepository(ProductsRepository);

    const stock = await stocksRepository.findOne(stockId);

    if (!stock) {
      throw new AppError('Stock does not exist');
    }

    const productIdsPromise = productIds.map(async productId => {
      const productExist = await productsRepository.findOne(productId);

      if (!productExist) {
        throw new AppError('Product does not exist');
      }

      return { productId, stockId };
    });

    const productsToStock = await Promise.all(productIdsPromise);

    await productsToStockRepository.save(productsToStock);

    const updatedStock = await stocksRepository
      .createQueryBuilder('stocks')
      .leftJoinAndSelect('stocks.productToStocks', 'productToStocks')
      .where(`id = '${stockId}'`)
      .getOne();

    if (!updatedStock) {
      throw new AppError('Stock does not exist');
    }

    return updatedStock;
  }
}

export default AddProductToStockService;
